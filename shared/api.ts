/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// ============================================
// LOCATIONS (Места)
// ============================================
export interface Location {
  id: string;
  name: string; // Auto-generated from settlement + address
  settlementName: string; // Населенный пункт
  fullAddress: string; // Полный адрес (from geolocation)
  coordinates: {
    latitude: number;
    longitude: number;
  };
  company: string; // Фирма
  contact: string; // Контакт
  loadingType: "rear" | "side" | "top"; // Тип загрузки: Задняя, Боковая, Верхняя
  cargoType: string[]; // Груз (multiple selections)
  comment: string; // Комментарий к месту
  createdAt: string;
  updatedAt: string;
}

// ============================================
// REFUELING (Заправки)
// ============================================
export interface Refueling {
  id: string;
  date: string; // Дата заправки
  liters: number; // Количество литров
  location: "barrel" | "gas_station"; // Место заправки: Бочка, АЗС
  waybillId: string; // Связь с Путевые листы
  createdAt: string;
  updatedAt: string;
}

// ============================================
// WAYBILLS (Путевые листы)
// ============================================
export interface Waybill {
  id: string;
  name: string; // Auto-generated: Дата выезда - Дата приезда
  departureDate: string; // Дата выезда
  departureOdometer: number; // Одометр выезд
  departureFuel: number; // ДТ выезд (Fuel at departure)
  arrivedDate: string; // Дата приезда
  arrivedOdometer: number; // Одометр приезд
  arrivedFuel: number; // ДТ приезд (Fuel at arrival)
  refuelingIds: string[]; // Заправки
  shipmentIds: string[]; // Связь с Перевозки
  createdAt: string;
  updatedAt: string;
}

// ============================================
// SHIPMENTS (Перевозки)
// ============================================
export interface Shipment {
  id: string;
  name: string; // Auto-generated: Дата загрузки - Дата разгрузки (if exists)
  loadingDate: string; // Дата загрузки
  loadingOdometer: number; // Одометр загрузки
  loadingLocationId: string; // Место загрузки (reference to Location)
  cargoWeight: number; // Вес груза
  unloadingDate: string; // Дата разгрузки
  unloadingOdometer: number; // Одометр разгрузка
  unloadingLocationId: string; // Место разгрузки (reference to Location)
  mileage: number; // Пробег (calculated: unloadingOdometer - loadingOdometer)
  waybillId: string; // Связь с Путевые листы
  financeIds: string[]; // Связь с Финансы
  createdAt: string;
  updatedAt: string;
}

// ============================================
// FINANCE (Финансы)
// ============================================
export interface Finance {
  id: string;
  operationDate: string; // Дата операции
  operationType: "charged" | "received"; // Тип операции: Начислено, Поступило
  charged: number; // Начислено
  received: number; // Поступило
  paymentMonth: string; // Месяц оплаты
  deductions: number; // Отчисления
  balance: number; // Остаток (calculated: charged - received)
  reportingMonth: string; // Месяц отчетности (calculated formula)
  shipmentId: string; // Связь с Перевозки
  createdAt: string;
  updatedAt: string;
}
