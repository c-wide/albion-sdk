export type Ok<T> = {
  ok: true
  data: T
}

export type Err<T> = {
  ok: false
  error: T
}

export type Result<T, E> = Ok<T> | Err<E>
