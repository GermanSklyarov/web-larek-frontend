# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Архитектура
Архитектура MVP разделяет логику приложения на 3 компонента: Model, View и Presenter. В данном проекте для управления событиями между компонентами используется EventEmitter.

### Model
Модель отвечает за управление данными приложения. Она взаимодействует с базой данных и выполняет бизнес-логику. Модель включает классы для работы с товарами и заказами: AppState, Item, Order.

### View
Отвечает за отображение данных пользователю. Классы: Page, Card, Modal, Basket, OrderForm.

### Presenter
Выступает в качестве посредника между моделью и представлением. Он обрабатывает пользовательские действия, обновляет модель и уведомляет представление о необходимости обновления. Презентер использует EventEmitter для обработки событий, что позволяет делатьь архитектуру более гибкой и модульной.

## Базовые классы

Класс EventEmitter обеспечивает работу событий. Его функции: возможность установить и снять слушателей событий, вызвать слушателей при возникновении события.

Класс Api реализует отправку запросов на сервер с помощью методов get и post, а также обработку ответа с помощью метода handleResponse
constructor(baseUrl: string, options: RequestInit = {}) - принимает baseUrl и параметры запроса
Методы:
protected handleResponse(response: Response): Promise<object> - для обработки ответа сервера
get(uri: string) - для отправки get запросов
post(uri: string, data: object, method: ApiPostMethods = 'POST') - для отправки post запросов

Класс Model реализует управление данными приложения. Является родительским для классов, отвечающих за работу с данными.
constructor(data: Partial<T>, events: IEvents) - принимает данные и брокер событий
Методы:
getItems(): IItem[] - получить список товаров
addToBasket(item: IItem): void - добавить товар в корзину
removeFromBasket(itemId: string): void - удалить товар из корзины
checkIsItemInBasket(itemId: string): boolean - проверяет, есть ли товар в корзине
getBasketItems(): IItem[] - получить список товаров в корзине
validateOrderData(orderData: IOrderFormData): void - валидация данных для оформления заказа
placeOrder(order: IOrder): void - оформить заказ

Класс View предназначен для создания компонентов пользовательского интерфейса. Является родительским для классов отображения.
constructor(container: HTMLElement, events: IEvents) - принимает контейнер для размещения компонента и брокер событий.
Методы:
render(data?: Partial<T>): HTMLElement - для отрисовки элемента
showItems(items: IItem[]): void - для отрисовки каталога 
updateBasket(items: IItem[]): void - перерисовывает корзину
showOrderConfirmation(): void - отображает окно успешного заказа

## Компоненты

Класс AppState - отслеживает состояние всего приложения. Наследует от Model.
constructor(data: Partial<T>, events: IEvents) - принимает данные и брокер событий
items: IItem[] - каталог
selectedItem: IItem - выбранный элемент
basket: IItem[] - состояние корзины
orderFormData: IOrderFormData - данные для оформления заказа

Класс Item - для работы с данными отдельной карточки. Наследует от Model.
constructor(data: Partial<T>, events: IEvents) - принимает данные и брокер событий
id: string - id товара
description: string - описание товара
image: string - изображение товара
title: string - название товара
category: string - категория товара
price: number | null - цена товара

Класс Order - для работы с данными оформления заказа. Наследует от Model.
constructor(data: Partial<T>, events: IEvents) - принимает данные и брокер событий
paymentType: PaymentType - способ оплаты
email: string - адрес электронной почты
phone: string - номер телефона
address: string - адрес доставки
total: number - сумма заказа
items: string[] - товары в заказе

Класс Page - отображение всей страницы. Наследует от View.
constructor(container: HTMLElement, events: IEvents) - принимает контейнер для размещения компонента и брокер событий.
catalog: HTMLElement[] - каталог товаров
basketCounter: number - количество товаров в корзине

Класс Card - отображение отдельной карточки. Наследует от View.
constructor(container: HTMLElement, events: IEvents, options: IItem) - принимает контейнер, брокер событий и объект с данными для отрисовки

Класс Basket - отображение корзины. Наследует от View.
constructor(container: HTMLElement, events: IEvents) - принимает контейнер для размещения компонента и брокер событий.
items: HTMLElement[] - товары в корзине
totalAmount: number - общая сумма товаров

Класс Modal - отображение модального окна. Наследует от View.
constructor(container: HTMLElement, events: IEvents) - принимает контейнер для размещения компонента и брокер событий.
content: HTMLElement - контент для отображения

Класс OrderForm - отображение формы заказа. Наследует от View.
constructor(container: HTMLElement, events: IEvents) - принимает контейнер для размещения компонента и брокер событий.
isValid: boolean - валидность формы
validationErrors: string[] - ошибки валидации

## Взаимодействие компонентов

Карточка товара вызывает событие basket:update, когда пользователь добавляет товар в корзину. Корзина обновляет свой список товаров и общую стоимость. Она также может взаимодействовать с Формой для оформления заказа, вызывая событие checkout, когда пользователь готов оформить заказ. Форма для оформления заказа собирает данные пользователя и вызывает событие order:submit, затем обновляется Модель и уведомляет все компоненты об успешном оформлении заказа через EventEmitter.

