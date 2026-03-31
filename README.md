# Food Hive App 📱

Мобильное приложение для доставки еды — клиентская часть сервиса Food Hive. Современный интерфейс, офлайн-режим и бесшовная синхронизация с сервером.

[![React Native](https://img.shields.io/badge/React_Native-0.84-blue?logo=react&logoColor=white)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-4-cyan?logo=tailwindcss&logoColor=white)](https://www.nativewind.dev/)
[![Zustand](https://img.shields.io/badge/Zustand-5-orange)](https://zustand-demo.pmnd.rs/)
[![React Query](https://img.shields.io/badge/React_Query-5-ff69b4?logo=reactquery&logoColor=white)](https://tanstack.com/query)

---

## 📋 Содержание

- [О проекте](#-о-проекте)
- [Возможности](#-возможности)
- [Технологический стек](#-технологический-стек)
- [Архитектура приложения](#-архитектура-приложения)
- [Быстрый старт](#-быстрый-старт)
- [Структура проекта](#-структура-проекта)
- [Основные функции](#-основные-функции)
- [Безопасность](#-безопасность)
- [Контакты](#-контакты)

---

## 🍽️ О проекте

**Food Hive App** — это кроссплатформенное мобильное приложение для заказа еды, разработанное на React Native. Приложение демонстрирует современные подходы к мобильной разработке: типобезопасность, оптимистичные обновления и бесшовную синхронизацию с сервером.

Проект создан для портфолио и демонстрирует навыки frontend/mobile-разработки.

**Связанные проекты:**
- [Food Hive API](https://github.com/MaksimovK/food-hive-server) — серверная часть

---

## ✨ Возможности

### 🏠 Главная страница
- Баннеры с акциями и специальными предложениями
- Категории продуктов с быстрым переходом
- Товары по категориям с возможностью добавления в корзину

### 🔍 Поиск
- Поиск продуктов с debounce
- Бесконечная прокрутка результатов
- Фильтрация по категориям

### 🛒 Корзина
- Добавление товаров с выбором количества
- Управление количеством в корзине
- Офлайн-режим с последующей синхронизацией
- Оформление заказа с выбором адреса и оплаты
- Быстрая очистка списка

### ❤️ Избранное
- Добавление/удаление товаров в избранное
- Синхронизация с сервером
- Быстрая очистка списка

### 📦 Заказы
- Оформление заказа с выбором адреса доставки
- Выбор способа оплаты (карта/наличные)
- История заказов со статусами
- Повтор предыдущих заказов

### 👤 Профиль
- Редактирование профиля
- Загрузка аватара
- Управление адресами доставки
- История заказов
- Настройки темы

### 🎨 Темы
- Светлая тема
- Тёмная тема
- Системная (автоматически)

---

## 🛠️ Технологический стек

| Категория | Технологии |
|-----------|------------|
| **Фреймворк** | React Native 0.84 |
| **Язык** | TypeScript 5 |
| **Стили** | NativeWind (Tailwind CSS) |
| **Навигация** | React Navigation 7 |
| **State** | Zustand |
| **Data Fetching** | TanStack Query 5 |
| **HTTP** | Axios |
| **Формы** | React Hook Form + Zod |
| **Иконки** | Lucide React Native |
| **Анимации** | react-native-reanimated |
| **Хранение** | AsyncStorage, EncryptedStorage |
| **Тосты** | react-native-toast-message |

---

## 🏗️ Архитектура приложения

```
┌─────────────────────────────────────────────────────────────────┐
│                        App.tsx                                  │
│                    (Navigation + Providers)                     │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  QueryClient     │ │   ThemeProvider  │ │  NetworkProvider │
│  (React Query)   │ │   (light/dark)   │ │  (offline check) │
└──────────────────┘ └──────────────────┘ └──────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   Auth Store     │ │   Cart Store     │ │ Favorites Store  │
│   (Zustand)      │ │   (Zustand)      │ │   (Zustand)      │
│   + Encrypted    │ │   + Sync         │ │   + Sync         │
└──────────────────┘ └──────────────────┘ └──────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Navigation Stack                             │
│  MainTabs → Home/Search/Favorites/Cart/Profile                  │
│  + ProductInfo, Auth, Order, OrderHistory, Address              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Screens + Components                       │
│  (UI Components, Elements, Layout, Forms)                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API Layer (Axios)                            │
│  Services → Interceptors → Backend                              │
│  (auto refresh JWT, error handling)                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Быстрый старт

### Требования

- Node.js 22.11+
- npm / bun
- Android Studio (для Android)
- Xcode (для iOS, macOS)
- CocoaPods (для iOS)

### Установка

1. **Клонируйте репозиторий**
```bash
git clone https://github.com/MaksimovK/food-hive-mobile.git
cd food-hive/foodhive
```

2. **Установите зависимости**
```bash
npm install
# или
bun install
```

3. **Настройте переменные окружения**

Создайте файл `.env` в корне проекта:

```env
SERVER_URL=http://localhost:4200
DADATA_URL=https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/
DADATA_API_TOKEN=your_dadata_api_token
```

4. **iOS: установите CocoaPods зависимости**
```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

5. **Запуск приложения**

```bash
# Запуск Metro bundler
npm start

# Android
npm run android

# iOS
npm run ios
```

---

## 📁 Структура проекта

```
foodhive/
├── src/
│   ├── api/                    # Axios интерсепторы
│   │   ├── error.ts            # Обработка ошибок
│   │   └── interceptor.ts      # JWT refresh логика
│   │
│   ├── assets/                 # Изображения, ресурсы
│   │   └── images/
│   │       └── logo.png
│   │
│   ├── components/
│   │   ├── elements/           # Составные элементы
│   │   │   ├── address/        # AddressCard, AddressSuggestions
│   │   │   ├── auth/           # AuthToggle
│   │   │   ├── banners/        # Banners
│   │   │   ├── categories/     # Categories
│   │   │   ├── order/          # Order элементы
│   │   │   ├── product/        # ProductInfo, Nutrition
│   │   │   ├── product-card/   # Карточки товаров
│   │   │   └── profile/        # ProfileHeader
│   │   │
│   │   ├── layout/             # Layout компоненты
│   │   │   └── Layout.tsx
│   │   │
│   │   ├── screens/            # Экраны приложения
│   │   │   ├── about/
│   │   │   ├── address/
│   │   │   ├── auth/
│   │   │   ├── cart/
│   │   │   ├── favorite/
│   │   │   ├── home/
│   │   │   ├── order/
│   │   │   ├── order-details/
│   │   │   ├── order-history/
│   │   │   ├── product-info/
│   │   │   ├── profile/
│   │   │   └── search/
│   │   │
│   │   └── ui/                 # Базовые UI компоненты
│   │       ├── buttons/        # Button, PrimaryButton, IconButton
│   │       ├── forms/          # LoginForm, RegisterForm
│   │       ├── input/          # Input, PhoneInput, DatePicker
│   │       ├── modals/         # Modal, ThemeModal
│   │       ├── toast/          # ToastItem
│   │       ├── Container.tsx
│   │       ├── Grid.tsx
│   │       ├── Loader.tsx
│   │       ├── Scroll.tsx
│   │       ├── Select.tsx
│   │       ├── Separator.tsx
│   │       ├── Switch.tsx
│   │       ├── Text.tsx
│   │       └── Title.tsx
│   │
│   ├── config/                 # Конфигурация
│   │   ├── api.config.ts
│   │   └── toast.config.tsx
│   │
│   ├── constants/              # Константы
│   │   ├── colors.constant.ts
│   │   ├── component.constant.ts
│   │   ├── month.constant.ts
│   │   ├── orderStatus.constant.ts
│   │   └── regex.constant.ts
│   │
│   ├── hooks/                  # Кастомные хуки
│   │   ├── navigation/         # useTypedNavigation, useTypedRoute
│   │   ├── queries/            # React Query хуки
│   │   ├── useAddressSuggestions.ts
│   │   ├── useDebounce.ts
│   │   └── useThemeMode.ts
│   │
│   ├── navigation/             # Навигация
│   │   ├── stack/              # Stack навигаторы
│   │   │   ├── cart/
│   │   │   ├── favorite/
│   │   │   ├── home/
│   │   │   ├── profile/
│   │   │   └── search/
│   │   ├── tab/                # Tab навигатор
│   │   │   └── TabNavigation.tsx
│   │   ├── Navigation.tsx
│   │   └── navigation.types.ts
│   │
│   ├── providers/              # Провайдеры
│   │   ├── network/
│   │   │   └── NetworkProvider.tsx
│   │   ├── theme/
│   │   │   └── ThemeProvider.tsx
│   │   └── Providers.tsx
│   │
│   ├── services/               # API сервисы
│   │   ├── address.service.ts
│   │   ├── auth.service.ts
│   │   ├── cart.service.ts
│   │   ├── dadata.service.ts
│   │   ├── favorite.service.ts
│   │   ├── home.service.ts
│   │   ├── order.service.ts
│   │   ├── product.service.ts
│   │   └── user.service.ts
│   │
│   ├── store/                  # Zustand сторы
│   │   ├── auth.store.ts
│   │   ├── cart.store.ts
│   │   ├── favorites.store.ts
│   │   ├── theme.store.ts
│   │   └── index.ts
│   │
│   ├── styles/                 # Глобальные стили
│   │   └── global.css
│   │
│   ├── types/                  # TypeScript типы
│   │   ├── home/
│   │   ├── address.types.ts
│   │   ├── auth.types.ts
│   │   ├── cart.types.ts
│   │   ├── dadata.types.ts
│   │   ├── favorite.types.ts
│   │   ├── order.types.ts
│   │   ├── product.types.ts
│   │   ├── root.types.ts
│   │   ├── user.types.ts
│   │   └── index.ts
│   │
│   └── utils/                  # Утилиты
│       ├── formatters/
│       │   └── format.utils.ts
│       ├── image.util.ts
│       └── index.ts
│
├── App.tsx                     # Точка входа
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── babel.config.js
└── metro.config.js
```

---

## 📱 Основные функции

### 🔐 Аутентификация
- Регистрация с валидацией (email, пароль, телефон, дата рождения)
- Вход по email/паролю
- JWT токены с auto-refresh
- Безопасное хранение в EncryptedStorage

### 🛒 Управление корзиной
- **Офлайн-первый подход**: товары сохраняются локально
- **Синхронизация**: при авторизации данные синхронизируются с сервером
- **Оптимистичные обновления**: мгновенный отклик UI
- **Разрешение конфликтов**: серверные данные приоритетны + добавление локальных товаров

### ❤️ Избранное
- Локальное хранение с синхронизацией
- Bulk-операции при синхронизации
- Мгновенная реакция UI

### 🌐 Network-aware
- Проверка подключения к интернету
- Экран "Нет сети" с кнопкой повторной проверки
- Автоматическое восстановление соединения

### 🎨 Темизация
- Переключение тем в реальном времени
- Сохранение выбора пользователя
- Системная тема (автоопределение)

### 📍 Адреса
- Подсказки адресов через DaData API
- Валидация в реальном времени
- Адрес по умолчанию

---

## 🔒 Безопасность

- **JWT токены**: хранятся в EncryptedStorage
- **Auto-refresh**: автоматическое обновление токенов
- **Валидация форм**: Zod схемы для всех форм
- **Безопасные запросы**: интерсепторы с обработкой ошибок

---

## 👤 Контакты

**Автор**: Максимов Кирилл  
**Email**: kmakismov@yandex.ru  
**GitHub**: [github.com/MaksimovK](https://github.com/MaksimovK)  

**Связанные проекты:**
- [Food Hive API](https://github.com/MaksimovK/food-hive-server) — серверная часть

---

<div align="center">

**Food Hive App** — создано с ❤️ для портфолио

</div>
