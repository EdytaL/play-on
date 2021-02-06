import { Resource } from './resource-model'

export interface VideoDetails {
    id: string
    title: string
    audience: string
    description: string
    aspectRatio?: string
    length?: string
    imageUrl: string
    resources: Array<Resource>
}
