/**
 * @param   {object} localizations
 * @param   {string} localizations[language_key].title
 * @param   {string} localizations[language_key].description
 * @returns {object[]}
 */
function createTranslationList(localizations, attrs = {}) {
    return Object
        .entries(localizations)
        .map(([language, { title, description }]) => ({
            ...attrs,
            language,
            title,
            description,
        }));
}


module.exports = { createTranslationList };
