export interface View {
  name: string;
  group: string;
}

export interface ViewModel {
  modules?: View[],
  views?: Record<string, View[]>,
  actions: Record<string, string[]>
}

export interface ModelData {
  sys?: ViewModel;
  app?: ViewModel;
}