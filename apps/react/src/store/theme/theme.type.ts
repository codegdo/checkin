// export interface ThemeData { 
//   system: Record<string, unknown>;
//   internal: Record<string, unknown>;
//   external: Record<string, unknown>;
//   public: Record<string, unknown>;
// }

export type ThemeType = 'system' | 'internal' | 'external' | 'public';

export type ThemeTemplate = {
  [Key in ThemeType]: Record<string, string>;
};

export type ThemeData = Partial<ThemeTemplate>;
