import { CategoryUtilitiesViewModel } from './categories/categoryUtilitiesView.model';
import { UtilityViewModel } from './utilityView.model';

export interface UtilityListViewModel {
    category: CategoryUtilitiesViewModel;
    utilities: UtilityViewModel[];
}