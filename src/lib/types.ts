export type Status = 'no-op' | 'loading' | 'success' | 'error';

export type GenericList<T> = {
	status: Status;
	data: Array<T>;
};

export type GenericItem<T> = {
	status: Status;
	data: T | null;
};

export type ForumUser = {
	nickName: string;
};

export type ForumChannel = {
	id: string;
	name: string;
	slug: string;
	description?: string;
};

export type ForumComment = {
	id: string;
	content: string;
	user?: ForumUser;
	user_name: string;
	created_at: string;
};

export type ForumPost = {
	id: string;
	parent_id?: string;
	header: string;
	content: string;
	care_count: number;
	comment_count: number;
	cohort_name: string;
	channel_name: string;
	user?: ForumUser;
	user_name: string;
	channel_id: string;
	created_at: string;
};

export type BookmarkItem = {
	id: string;
	title: string;
	slug: string;
	summary: string;
	contentType: string;
};

export type NewPasswordReq = {
	otp: string;
	newPassword: string;
};

export type BookMarkItem = {
	id?: number;
	item_id: string;
	item_type: string;
	title: string;
	slug: string;
};
