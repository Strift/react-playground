export interface Movie {
  id: number
  title: string
  overview: string
  genre?: string[]
  poster: string
  release_date: number
}

export type PromotedMovie = Movie & {
  keywords: string
}
