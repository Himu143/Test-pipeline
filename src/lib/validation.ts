import * as zod from 'zod';

// reusable field validators
export const emailValidator = zod
	.string()
	.refine((val) => val.length > 0, { message: "Email can't be empty" })
	.refine((val) => val.length === 0 || zod.email().safeParse(val).success, {
		message: 'Not a valid email'
	});

export const passwordValidator = zod.string().superRefine((val, ctx) => {
	if (val.length === 0) {
		ctx.addIssue({
			code: 'custom',
			message: "Password can't be empty"
		});
		return;
	}

	const hasLength = val.length >= 8;
	const hasLetter = /[a-zA-Z]/.test(val);
	const hasNumber = /\d/.test(val);

	if (!hasLength || !hasLetter || !hasNumber) {
		ctx.addIssue({
			code: 'custom',
			message:
				'Password must be at least 8 characters long, contain at least one letter and one number'
		});
	}
});

export const simplePasswordValidator = zod
	.string()
	.refine((val) => val.length > 0, { message: "Password can't be empty" })
	.refine((val) => val.length === 0 || val.length >= 8, {
		message: 'Password must be at least 8 characters long'
	});

export const fullNameValidator = zod.string().min(1, { message: "Full name can't be empty" });

export const firstNameValidator = zod.string().min(1, { message: "First name can't be empty" });

export const lastNameValidator = zod.string().min(1, { message: "Last name can't be empty" });

export const relationshipValidator = zod
	.string()
	.min(1, { message: "Relationship can't be empty" });

export const phoneNumberValidator = zod.string().optional();

export const zipCodeValidator = zod.string().optional();

export const otpValidator = zod.string().superRefine((val, ctx) => {
	if (val.length === 0) {
		ctx.addIssue({
			code: 'custom',
			message: "Verification code can't be empty"
		});
		return;
	}

	if (!/^\d*$/.test(val)) {
		ctx.addIssue({
			code: 'custom',
			message: 'Verification code must contain only digits'
		});
		return;
	}

	if (val.length !== 6) {
		ctx.addIssue({
			code: 'custom',
			message: 'Verification code must be 6 digits'
		});
	}
});

// for each page
export const signUpSchema = zod
	.object({
		firstName: firstNameValidator,
		lastName: lastNameValidator,
		fullName: fullNameValidator,
		email: emailValidator,
		relationship: relationshipValidator,
		phoneNumber: phoneNumberValidator,
		zipCode: zipCodeValidator,
		password: passwordValidator,
		confirmPassword: zod.string().trim(),
		terms: zod.boolean().refine((val) => val === true, {
			message: 'You must agree to the terms and privacy policy'
		})
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: "Passwords don't match"
	});

export const simpleSignUpSchema = zod
	.object({
		fullName: fullNameValidator,
		email: emailValidator,
		password: passwordValidator,
		confirmPassword: zod.string().trim()
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: "Passwords don't match"
	});

export type SimpleSignUpSchema = zod.infer<typeof simpleSignUpSchema>;

export const signInSchema = zod.object({
	email: zod
		.string()
		.refine((val) => val.length > 0, { message: "Email can't be empty" })
		.refine((val) => val.length === 0 || zod.email().safeParse(val).success, {
			message: 'Not a valid email'
		}),
	password: simplePasswordValidator
});

export type SignInSchema = zod.infer<typeof signInSchema>;

export const forgotPasswordSchema = zod.object({
	email: emailValidator
});

export const otpSchema = zod.object({
	otp: otpValidator
});

export const resetPasswordSchema = zod
	.object({
		otp: otpValidator,
		password: passwordValidator,
		confirmPassword: zod.string().trim()
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: "Passwords don't match"
	});

export const setNewPasswordSchema = zod
	.object({
		otp: otpValidator,
		password: passwordValidator,
		confirmPassword: zod.string().trim()
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: "Passwords don't match"
	});

export const messageValidator = zod.string().min(1, { message: "Message can't be empty" });

export const contactSchema = zod.object({
	name: zod.string().min(1, { message: "Name can't be empty" }),
	email: emailValidator,
	relation_with_patient: relationshipValidator,
	message: messageValidator
});

export const contactUsSchema = zod.object({
	firstName: zod.string().min(1, { message: 'First name is required' }),
	lastName: zod.string().min(1, { message: 'Last name is required' }),
	organization: zod.string().optional(),
	email: emailValidator,
	interests: zod
		.object({
			learnMore: zod.boolean(),
			askQuestions: zod.boolean(),
			seeDemo: zod.boolean(),
			somethingElse: zod.boolean()
		})
		.refine((data) => Object.values(data).some((val) => val), {
			message: 'Please select at least one option'
		}),
	message: zod.string().optional()
});
