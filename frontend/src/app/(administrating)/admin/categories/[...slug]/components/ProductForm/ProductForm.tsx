'use client';
import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
import { ProductEntityInterface } from '../../../../../../../../../shared/types/Product/front/ProductEntity.interface';
import { createProductAction, updateProductAction } from '../../actions';
import { UpdateProductDtoInterface } from '../../../../../../../../../shared/types/Product/UpdateProductDto.interface';
import { CategoryEntityInterface } from '../../../../../../../../../shared/types/Category/front/CategoryEntity.interface';
import { CreateProductDtoInterface } from '../../../../../../../../../shared/types/Product/CreateProductDto.interface';

export default function ProductForm(props: {
  product?: ProductEntityInterface;
  formName?: string;
  category: CategoryEntityInterface;
}) {
  const { product, formName, category } = props;

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish2 = (
    dto: UpdateProductDtoInterface & CreateProductDtoInterface
  ) =>
    dto.id
      ? updateProductAction(dto)
      : createProductAction({ ...dto, categoryId: category.id });

  return (
    <Form
      name={formName || 'product'}
      size="large"
      initialValues={{ remember: true }}
      onFinish={onFinish2}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item name="id" initialValue={product?.id} hidden={true}>
        <InputNumber hidden={true} name="id" />
      </Form.Item>
      <Form.Item
        initialValue={product?.published || false}
        name="published"
        valuePropName="checked"
      >
        <Checkbox
          value={product?.published || false}
          checked={product?.published || false}
          name="published"
        >
          Опубликован
        </Checkbox>
      </Form.Item>
      <Form.Item
        label="Название блюда"
        name="title"
        initialValue={product?.title}
        rules={[{ required: true, message: 'Введите название блюда!' }]}
      >
        <Input type="text" maxLength={80} />
      </Form.Item>
      <Form.Item
        label="Цена"
        name="price"
        initialValue={product?.price || 1}
        rules={[{ required: true, message: 'Введите цену!' }]}
      >
        <InputNumber
          controls={false}
          parser={(value) => {
            const int = parseInt(value || '0');
            if (int < 0) {
              return 0;
            } else if (int > 1000000) {
              return 1000000;
            } else {
              return int;
            }
          }}
        />
      </Form.Item>
      <Form.Item
        label="Описание (состав, калорийность...)"
        name="description"
        initialValue={product?.description}
        rules={[{ required: true, message: 'Введите описание блюда!' }]}
      >
        <Input.TextArea
          placeholder={`Состав: картошка, капуста ${'\n'}Калорийность на 100г: 240ккал`}
          maxLength={500}
        />
      </Form.Item>
      <Form.Item
        label="Вес(гр) / Объем(мл)"
        name="weight"
        initialValue={product?.weight || 1}
        rules={[{ required: true, message: 'Введите вес или объем блюда!' }]}
      >
        <InputNumber
          controls={false}
          parser={(value) => {
            const int = parseInt(value || '1');
            if (int < 1) {
              return 1;
            } else if (int > 100000) {
              return 100000;
            } else {
              return int;
            }
          }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
}
