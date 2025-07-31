export class ApiResult<T> {
	statusCode: number;
	isSuccess: boolean;
	data: T | null;
	errors: [];
	error: [];
}
export class NullApiResult {
	statusCode: number;
	isSuccess: boolean;
	errors: [];
	error: [];
}
export class GenericListingResult<T> {
	data: ListingData<T> | null;
	page: number;
	pageSize: number;
	totalCount: number;
	totalPages: number;
	totalRecords: number;
}
export class ListingData<T> {
	items: T[];
}
