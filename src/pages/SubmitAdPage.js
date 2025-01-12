import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, Select, Checkbox, InputNumber, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import categoriesData from "../assets/categories.json"; // Импортируем файл с категориями
import "./SubmitAdPage.css";


const SubmitAdPage = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState(""); // Для хранения имени выбранной категории

  useEffect(() => {
    // Загружаем категории из JSON файла
    setCategories(categoriesData);
  }, []);

  const handleCategoryChange = (value) => {
    // Найти выбранную категорию по id
    const selectedCategory = categories.find((category) => category.id === value);
    setCategoryName(selectedCategory ? selectedCategory.name : "Не указано");
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    
    // Добавляем все поля из формы
    formData.append("category", categoryName); // Отправляем имя категории
    formData.append("title", values.title);
    formData.append("description", values.fullDescription);
    formData.append("price", values.price);
    formData.append("brand", values.brand);
    formData.append("model", values.model);
    formData.append("type", values.type);
    formData.append("year", values.year);
    formData.append("power", values.power);
    formData.append("payload", values.payload);
    formData.append("condition", values.condition);
    formData.append("mileage", values.mileage);
    formData.append("engineHours", values.engineHours);
    formData.append("pts", values.pts);
    formData.append("vin", values.vin);
    formData.append("availability", values.availability);
    formData.append("location", values.location);
    formData.append("fullDescription", values.fullDescription);

    // Добавляем фотографии, если они есть
    if (values.photos && values.photos.fileList) {
      values.photos.fileList.forEach((file) => {
        formData.append("photos", file.originFileObj);
      });
    }

    // Добавляем утильсбор
    formData.append("utilityFee", values.utilityFee);

    try {
      // Отправляем запрос на сервер
      const response = await fetch("http://localhost:5000/api/ads", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Объявление успешно отправлено:", result);
      message.success("Объявление успешно размещено!");

      // Очистить форму или показать сообщение пользователю
      form.resetFields();
    } catch (error) {
      console.error("Ошибка отправки данных:", error);
      message.error("Ошибка при добавлении объявления.");
    }
  };

  return (
    <div className="submit-ad-container">
      <h2>Новое объявление</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          contactName: "Игорь",
        }}
      >
        <Form.Item label="Категория" name="category" rules={[{ required: true }]}>
          <Select placeholder="Выберите категорию" onChange={handleCategoryChange}>
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Фотографии" name="photos">
          <Upload
            listType="picture"
            maxCount={40}
            accept="image/*"
            multiple
            beforeUpload={() => false} // Для предотвращения автоматической загрузки файлов
          >
            <Button icon={<UploadOutlined />}>Загрузить фото</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Цвет" name="color">
          <Input placeholder="Укажите цвет" />
        </Form.Item>

        <Form.Item label="Ссылка на видео" name="videoUrl">
          <Input placeholder="Вставьте ссылку на YouTube или Rutube" />
        </Form.Item>

        <Form.Item label="VIN или номер кузова" name="vin">
          <Input placeholder="Ваш VIN или номер кузова" />
        </Form.Item>

        <Form.Item label="Марка" name="brand">
          <Input placeholder="Введите марку" />
        </Form.Item>

        <Form.Item label="Модель" name="model">
          <Input placeholder="Введите модель" />
        </Form.Item>

        <Form.Item label="Тип техники" name="type">
          <Input placeholder="Введите тип техники" />
        </Form.Item>

        <Form.Item label="Год выпуска" name="year">
          <InputNumber style={{ width: "100%" }} placeholder="Введите год выпуска" min={1900} />
        </Form.Item>

        <Form.Item label="Мощность" name="power">
          <Input placeholder="Введите мощность" />
        </Form.Item>

        <Form.Item label="Грузоподъёмность" name="payload">
          <Input placeholder="Введите грузоподъёмность" />
        </Form.Item>

        <Form.Item label="Состояние" name="condition">
          <Input placeholder="Укажите состояние" />
        </Form.Item>

        <Form.Item label="Пробег" name="mileage">
          <InputNumber style={{ width: "100%" }} placeholder="Введите пробег" min={0} />
        </Form.Item>

        <Form.Item label="Моточасы" name="engineHours">
          <InputNumber style={{ width: "100%" }} placeholder="Введите моточасы" min={0} />
        </Form.Item>

        <Form.Item label="ПТС или ПСМ" name="pts">
          <Input placeholder="Введите ПТС или ПСМ" />
        </Form.Item>

        <Form.Item label="VIN, номер кузова или SN" name="vinNumber">
          <Input placeholder="Введите VIN или номер кузова" />
        </Form.Item>

        <Form.Item label="Доступность" name="availability">
          <Select placeholder="Выберите доступность">
            <Select.Option value="available">В наличии</Select.Option>
            <Select.Option value="sold">Продано</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Расположение" name="location">
          <Input placeholder="Укажите расположение" />
        </Form.Item>

        <Form.Item label="Полное описание" name="fullDescription">
          <Input.TextArea placeholder="Введите полное описание" rows={4} />
        </Form.Item>

        <Form.Item label="Цена с НДС" name="price" rules={[{ required: true }]}>
          <InputNumber
            placeholder="Укажите цену"
            style={{ width: "100%" }}
            min={0}
            formatter={(value) => `₽ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
          />
        </Form.Item>

        <Form.Item label="Утильсбор" name="utilityFee" rules={[{ required: true }]}>
          <Select placeholder="Выберите утильсбор">
            <Select.Option value="Включён">Включён</Select.Option>
            <Select.Option value="Не включён">Не включён</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Контактное лицо" name="contactName">
          <Input />
        </Form.Item>

        <Form.Item label="Телефон" name="phone" rules={[{ required: true }]}>
          <Input placeholder="Введите номер телефона" />
        </Form.Item>

        <Form.Item>
          <Checkbox>
            Я соглашаюсь с правилами размещения объявлений
          </Checkbox>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Разместить объявление
        </Button>
      </Form>
    </div>
  );
};

export default SubmitAdPage;
