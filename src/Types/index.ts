export type items = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export type CartItem = items & {
    quantity: number
}