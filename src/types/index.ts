interface IItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	isInBasket: boolean;
}

interface IItemAPI {
	getItems: () => Promise<IItem[]>;
	getItem: (id: string) => Promise<IItem>;
	orderItems: (order: IOrder) => Promise<OrderResult>;
}

interface IOrderFormData {
	paymentType: PaymentType;
	email: string;
	phone: string;
	address: string;
}

interface OrderResult {
	id: string;
	total: number;
}

interface IOrder extends IOrderFormData {
	total: number;
	items: string[];
}

type PaymentType = 'online' | 'offline';

interface AppState {
	items: IItem[];
	selectedItem: IItem;
	basket: IItem[];
	orderFormData: IOrderFormData;
}

interface IModel {
	getItems(): IItem[];
	addToBasket(item: IItem): void;
	removeFromBasket(itemId: string): void;
	checkIsItemInBasket(itemId: string): boolean;
	getBasketItems(): IItem[];
	validateOrderData(orderData: IOrderFormData): void;
	placeOrder(order: IOrder): void;
}

interface IPageView {
	catalog: HTMLElement[];
	basketCounter: number;
}

interface ICardView {
	onAddToBasket(callback: (item: IItem) => void): void;
}

interface IBasketView {
	items: HTMLElement[];
	totalAmount: number;

	onCheckout(callback: () => void): void;
}

interface IModalView {
	content: HTMLElement;
}

interface IOrderFormView {
	isValid: boolean;
	validationErrors: string[];

	onSubmit(callback: (orderData: IOrderFormData) => void): void;
}

interface IView<T> {
	render(data?: Partial<T>): HTMLElement;
	showItems(items: IItem[]): void;
	updateBasket(items: IItem[]): void;
	showOrderConfirmation(): void;
}

export {
	IItem,
	IItemAPI,
	IOrderFormData,
	OrderResult,
	IOrder,
	PaymentType,
	AppState,
	IModel,
	IPageView,
	ICardView,
	IBasketView,
	IModalView,
	IOrderFormView,
	IView,
};
