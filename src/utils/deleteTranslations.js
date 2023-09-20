const apiKey = 'xqW942yHAcoehSs1JRI9pMbAqTNIGl0hFEIdLgvS6cgogVlCrWzn7bWMIULvxQ3o';

// Function to delete translations for other users
async function deleteTranslations() {
  try {
    const response = await fetch('https://translations-api-production-3e9d.up.railway.app/translations', {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch translations');
    }

    const translations = await response.json();

    // Extract IDs of translations to delete
    const translationIdsToDelete = translations
      .filter((translation) => translation.username !== 'dewaldels')
      .map((translation) => translation.id);

    // Delete translations for other users
    for (const id of translationIdsToDelete) {
      const deleteResponse = await fetch(`https://translations-api-production-3e9d.up.railway.app/translations/${id}`, {
        method: 'DELETE',
        headers: {
          'X-API-Key': apiKey,
        },
      });

      if (!deleteResponse.ok) {
        console.error(`Failed to delete translation with ID ${id}`);
      }
    }

    console.log('Translations deleted successfully');
  } catch (error) {
    console.error('Error deleting translations:', error);
  }
}

// Call the function to delete translations
deleteTranslations();
