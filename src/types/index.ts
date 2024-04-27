export type RequestBody<T> = Omit<
  T,
  '_id' | 'id' | 'created_at' | 'updated_at'
>;