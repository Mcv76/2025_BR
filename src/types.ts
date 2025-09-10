export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
  order?: number;
  groupId: 'active' | 'completed';
}
