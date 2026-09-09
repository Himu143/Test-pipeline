export type GenericResp<T> =
	| {
			status: 'success';
			data: T;
			count?: number;
	  }
	| {
			status: 'error';
			message?: string;
	  };
