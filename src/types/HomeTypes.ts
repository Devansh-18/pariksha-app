export type FeatureType = {
    title:string,
    description:string,
    icon:string,
}

export type PlanType = {
    name: string,
    price: string,
    highlight: boolean,
    description: string,
    features: string[],
}