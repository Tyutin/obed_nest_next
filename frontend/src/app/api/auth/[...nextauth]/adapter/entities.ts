import * as nextAuthEntities from '../../../../../../../backend/src/next-auth/nextAuth.entity'
import { CityEntity } from '../../../../../../../backend/src/city/city.entity'
import { CategoryEntity } from '../../../../../../../backend/src/category/category.entity';
import { ProductEntity } from '../../../../../../../backend/src/product/product.entity';
import { ProfileEntity } from '../../../../../../../backend/src/profile/profile.entity'

export const defaultEntities = {...nextAuthEntities, ProfileEntity, CityEntity, CategoryEntity, ProductEntity}