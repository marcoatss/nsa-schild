import type { Schema, Attribute } from '@strapi/strapi';

export interface ContentBlockParagraph extends Schema.Component {
  collectionName: 'component_content_block_paragraph';
  info: {
    displayName: 'BlockParagraph';
    description: '';
  };
  attributes: {
    content: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'light';
        }
      >;
  };
}

export interface ContentGrid3X1Side extends Schema.Component {
  collectionName: 'component_content_grid_3x1_side';
  info: {
    displayName: 'Grid3x1Side';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<['left', 'right']>;
    dark: Attribute.Boolean;
    sticky: Attribute.Boolean;
    paragraph: Attribute.Component<'content.block-paragraph'>;
    grid: Attribute.Component<'content.grid-3x1'>;
  };
}

export interface ContentGrid3X1 extends Schema.Component {
  collectionName: 'component_content_grid_3x1';
  info: {
    displayName: 'Grid3x1';
    description: '';
  };
  attributes: {
    nth1: Attribute.Component<'content.grid-cell'>;
    nth2: Attribute.Component<'content.grid-cell'>;
    nth3: Attribute.Component<'content.grid-cell'>;
  };
}

export interface ContentGrid3X2Side extends Schema.Component {
  collectionName: 'component_content_grid_3x2_side';
  info: {
    displayName: 'Grid3x2Side';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<['left', 'right']>;
    dark: Attribute.Boolean;
    sticky: Attribute.Boolean;
    paragraph: Attribute.Component<'content.block-paragraph'>;
    grid: Attribute.Component<'content.grid-3x2'>;
  };
}

export interface ContentGrid3X2 extends Schema.Component {
  collectionName: 'component_content_grid_3x2';
  info: {
    displayName: 'Grid3x2';
    description: '';
  };
  attributes: {
    nth1: Attribute.Component<'content.grid-cell'>;
    nth2: Attribute.Component<'content.grid-cell'>;
    nth3: Attribute.Component<'content.grid-cell'>;
    nth4: Attribute.Component<'content.grid-cell'>;
    nth5: Attribute.Component<'content.grid-cell'>;
    nth6: Attribute.Component<'content.grid-cell'>;
  };
}

export interface ContentGrid3X3Side extends Schema.Component {
  collectionName: 'component_content_grid_3x3_side';
  info: {
    displayName: 'Grid3x3Side';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<['left', 'right']>;
    dark: Attribute.Boolean;
    sticky: Attribute.Boolean;
    paragraph: Attribute.Component<'content.block-paragraph'>;
    grid: Attribute.Component<'content.grid-3x3'>;
  };
}

export interface ContentGrid3X3 extends Schema.Component {
  collectionName: 'component_content_grid_3x3';
  info: {
    displayName: 'Grid3x3';
    description: '';
  };
  attributes: {
    nth1: Attribute.Component<'content.grid-cell'>;
    nth2: Attribute.Component<'content.grid-cell'>;
    nth3: Attribute.Component<'content.grid-cell'>;
    nth4: Attribute.Component<'content.grid-cell'>;
    nth5: Attribute.Component<'content.grid-cell'>;
    nth6: Attribute.Component<'content.grid-cell'>;
    nth7: Attribute.Component<'content.grid-cell'>;
    nth8: Attribute.Component<'content.grid-cell'>;
    nth9: Attribute.Component<'content.grid-cell'>;
  };
}

export interface ContentGrid5X1 extends Schema.Component {
  collectionName: 'component_content_grid_5x1';
  info: {
    displayName: 'Grid5x1';
    description: '';
  };
  attributes: {
    nth1: Attribute.Component<'content.grid-cell'>;
    nth2: Attribute.Component<'content.grid-cell'>;
    nth3: Attribute.Component<'content.grid-cell'>;
    nth4: Attribute.Component<'content.grid-cell'>;
    nth5: Attribute.Component<'content.grid-cell'>;
  };
}

export interface ContentGridCell extends Schema.Component {
  collectionName: 'component_content_grid_cell';
  info: {
    displayName: 'GridCell';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<['paragraph', 'image']>;
    dark: Attribute.Boolean;
    paragraph: Attribute.Component<'content.block-paragraph'>;
    media: Attribute.Media;
  };
}

export interface ContentHero extends Schema.Component {
  collectionName: 'component_content_hero';
  info: {
    displayName: 'Hero';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<['left', 'right']>;
    dark: Attribute.Boolean;
    sticky: Attribute.Boolean;
    fullHeight: Attribute.Boolean;
    paragraph: Attribute.Component<'content.block-paragraph'>;
    media: Attribute.Media;
  };
}

export interface ProductImage extends Schema.Component {
  collectionName: 'components_product_image';
  info: {
    displayName: 'Image';
    description: '';
  };
  attributes: {
    percentage: Attribute.Integer;
  };
}

export interface ProductMaterial extends Schema.Component {
  collectionName: 'components_product_material';
  info: {
    displayName: 'Material';
    description: '';
  };
  attributes: {
    material: Attribute.Relation<
      'product.material',
      'oneToOne',
      'api::material.material'
    >;
    percentage: Attribute.Integer;
  };
}

export interface ProductMedia extends Schema.Component {
  collectionName: 'components_product_media';
  info: {
    displayName: 'media';
    description: '';
  };
  attributes: {
    media: Attribute.Media & Attribute.Required;
    sortingIndex: Attribute.Integer &
      Attribute.Required &
      Attribute.DefaultTo<1000000>;
  };
}

export interface ProductModel extends Schema.Component {
  collectionName: 'components_product_models';
  info: {
    displayName: 'Model';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    supplier: Attribute.String;
    code: Attribute.String;
    weight: Attribute.Decimal;
    volume: Attribute.Decimal;
    height: Attribute.Decimal;
    length: Attribute.Decimal;
    depth: Attribute.Decimal;
    safetyAreaLength: Attribute.Decimal;
    safetyAreaDepth: Attribute.Decimal;
    fallHeight: Attribute.Decimal;
    weightUnit: Attribute.String & Attribute.DefaultTo<'kg'>;
    volumeUnit: Attribute.String & Attribute.DefaultTo<'m\u00B3'>;
    heightUnit: Attribute.String & Attribute.DefaultTo<'m'>;
    lengthUnit: Attribute.String & Attribute.DefaultTo<'m'>;
    depthUnit: Attribute.String & Attribute.DefaultTo<'m'>;
    safetyAreaLengthUnit: Attribute.String & Attribute.DefaultTo<'m'>;
    safetyAreaDepthUnit: Attribute.String & Attribute.DefaultTo<'m'>;
    fallHeightUnit: Attribute.String & Attribute.DefaultTo<'m'>;
    materials: Attribute.Component<'product.material', true>;
    optionGroups: Attribute.Component<'product.option-group', true>;
    media: Attribute.Media & Attribute.Required;
  };
}

export interface ProductOptionGroup extends Schema.Component {
  collectionName: 'components_product_option_groups';
  info: {
    displayName: 'OptionGroup';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    options: Attribute.Component<'product.option', true>;
  };
}

export interface ProductOption extends Schema.Component {
  collectionName: 'components_product_option';
  info: {
    displayName: 'Option';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
  };
}

export interface QuoteEntry extends Schema.Component {
  collectionName: 'components_quote_entry';
  info: {
    displayName: 'Entry';
    description: '';
  };
  attributes: {
    category: Attribute.String & Attribute.Required;
    subcategory: Attribute.String & Attribute.Required;
    product: Attribute.String & Attribute.Required;
    model: Attribute.String & Attribute.Required;
    notes: Attribute.String & Attribute.Required;
    options: Attribute.Component<'quote.option', true>;
    supplier: Attribute.String;
    code: Attribute.String;
  };
}

export interface QuoteOption extends Schema.Component {
  collectionName: 'components_quote_option';
  info: {
    displayName: 'Option';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    value: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'content.block-paragraph': ContentBlockParagraph;
      'content.grid-3x1-side': ContentGrid3X1Side;
      'content.grid-3x1': ContentGrid3X1;
      'content.grid-3x2-side': ContentGrid3X2Side;
      'content.grid-3x2': ContentGrid3X2;
      'content.grid-3x3-side': ContentGrid3X3Side;
      'content.grid-3x3': ContentGrid3X3;
      'content.grid-5x1': ContentGrid5X1;
      'content.grid-cell': ContentGridCell;
      'content.hero': ContentHero;
      'product.image': ProductImage;
      'product.material': ProductMaterial;
      'product.media': ProductMedia;
      'product.model': ProductModel;
      'product.option-group': ProductOptionGroup;
      'product.option': ProductOption;
      'quote.entry': QuoteEntry;
      'quote.option': QuoteOption;
    }
  }
}
