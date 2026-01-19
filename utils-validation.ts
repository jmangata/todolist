// ==============================================
// utils/validation.ts
// Validation et sanitization des entrées
// ==============================================

/**
 * Valide et nettoie l'entrée utilisateur pour les tâches
 */
export const validateTaskInput = (input: string): string => {
  // Limite de caractères
  const MAX_LENGTH = 500;
  
  // Supprimer les caractères dangereux et espaces superflus
  let sanitized = input
    .trim()
    .slice(0, MAX_LENGTH)
    .replace(/[<>]/g, '')           // Retire < et > (prévention XSS basique)
    .replace(/\n{3,}/g, '\n\n');    // Limite les sauts de ligne consécutifs
  
  return sanitized;
};

/**
 * Vérifie si une entrée est valide
 */
export const isValidTaskInput = (input: string): boolean => {
  if (!input || typeof input !== 'string') {
    return false;
  }
  
  const trimmed = input.trim();
  return trimmed.length > 0 && trimmed.length <= 500;
};

/**
 * Messages d'erreur de validation
 */
export const ValidationErrors = {
  EMPTY: 'La tâche ne peut pas être vide',
  TOO_LONG: 'La tâche ne peut pas dépasser 500 caractères',
  INVALID_TYPE: 'Format de tâche invalide',
} as const;