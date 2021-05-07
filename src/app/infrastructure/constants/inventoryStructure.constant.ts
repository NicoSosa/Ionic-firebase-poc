import { CategoryInventory, InventoryStructure } from 'src/app/models/inventories/inventoryStructure.model';
import { FormStyle } from '../enum/formStyle.enum';

const EMPANADAS: CategoryInventory = {
  category: 'Empanadas',
  unit: 'Container',
  formStyle: FormStyle.InputPlusSlider,
  items: [
    {
      id: '60994966-f6f1-4d80-b93a-12a887e59ad1',
      name: 'Meet',
      showName: 'Meet',
      slid: 16
    },
    {
      id: 'c4da461a-c9ea-4285-8c7e-38f7187d090e',
      name: 'Chicken',
      showName: 'Chicken',
      slid: 16
    },
    {
      id: 'af673743-4e1a-49ef-84e4-b8b0d0810e37',
      name: 'BBQ Pork',
      showName: 'BBQ Pork',
      slid: 10
    },
    {
      id: '58ed079e-5592-4ccb-8a6d-9445886b74d6',
      name: 'Sausage',
      showName: 'Sausage',
      slid: 8
    },
    {
      id: '65ad6b1f-4506-4b4c-aa2d-aa0272d6311f',
      name: 'Ham & Cheese',
      showName: 'Ham & Cheese',
      slid: 9
    },
    {
      id: '03780a3e-0b0f-4013-8466-99700483d780',
      name: 'Tuna',
      showName: 'Tuna',
      slid: 4
    },
    {
      id: '5449267c-f513-4ebf-942f-898a77e2e1c7',
      name: 'Bacon',
      showName: 'Bacon',
      slid: 6
    },
    {
      id: '8bfa9e10-d53b-436a-9786-1fdd59228e79',
      name: 'Caprese',
      showName: 'Caprese',
      slid: 6
    },
    {
      id: 'f10241c4-449f-445f-a412-fd3e52315e26',
      name: 'Spinach',
      showName: 'Spinach',
      slid: 11
    },
    {
      id: '5d5bb03f-7353-4dfb-bb5b-4dcebd9578fb',
      name: 'Mushroom',
      showName: 'Mushroom',
      slid: 8
    },
    {
      id: '015d7af2-bf79-43fb-a6fa-6efb74532b8b',
      name: 'Corn',
      showName: 'Corn',
      slid: 4
    },
    {
      id: '791a1d74-d244-4095-80ae-1d56d3108a51',
      name: 'Onion',
      showName: 'Onion',
      slid: 3
    },
    {
      id: '61c5511d-32e8-4fdb-9b1e-113b1ad2da30',
      name: 'Broccoli',
      showName: 'Broccoli',
      slid: 3
    },
    {
      id: '3660c9d0-561c-4416-ad93-c5f280902232',
      name: 'Apple',
      showName: 'Apple',
      slid: 7
    },
    {
      id: 'a32df6ce-7433-4827-b14c-fdc5242bdfda',
      name: 'Banana',
      showName: 'Banana',
      slid: 3
    },
    {
      id: '5e182117-72d3-4b38-965d-26aa3fe4f87c',
      name: 'Pepperoni',
      showName: 'Pepperoni',
      slid: 7
    },
    {
      id: 'ed587252-660b-479c-8825-20b63d980b15',
      name: 'Buffalo Chick',
      showName: 'Buffalo Chick',
      slid: 8
    },
    {
      id: '5aa56503-6322-4c43-821a-648b443dd2fc',
      name: '4 Cheese',
      showName: '4 Cheese',
      slid: 4
    },
    {
      id: '2e2e8f0b-9932-4526-a3dc-567d718d9c8e',
      name: 'Spin',
      showName: 'Spin',
      slid: 3
    },
    {
      id: '5742fdcf-d72a-42b8-ab09-bca41fb7bc08',
      name: 'Potato',
      showName: 'Potato',
      slid: 2
    },
    {
      id: '375ddfa0-cdc0-45e2-a202-69edc3859ea7',
      name: 'Soy',
      showName: 'Soy',
      slid: 2
    },
    
  ]
};

const FILLINGS: CategoryInventory = {
  category: 'Fillings',
  formStyle: FormStyle.InputPlusSlider,
  unit: 'Food Pans',
  items: [
    {
      id: '60994966-f6f1-4d80-b93a-12a887e59ad1',
      name: 'Meet',
      showName: 'Meet',
      slid: 6
    },
    {
      id: 'c4da461a-c9ea-4285-8c7e-38f7187d090e',
      name: 'Chicken',
      showName: 'Chicken',
      slid: 6
    },
    {
      id: 'af673743-4e1a-49ef-84e4-b8b0d0810e37',
      name: 'BBQ Pork',
      showName: 'BBQ Pork',
      slid: 6
    },
    {
      id: '58ed079e-5592-4ccb-8a6d-9445886b74d6',
      name: 'Sausage',
      showName: 'Sausage',
      slid: 6
    },
    {
      id: '65ad6b1f-4506-4b4c-aa2d-aa0272d6311f',
      name: 'Ham & Cheese',
      showName: 'Ham & Cheese',
      slid: 6
    },
    {
      id: '03780a3e-0b0f-4013-8466-99700483d780',
      name: 'Tuna',
      showName: 'Tuna',
      slid: 6
    },
    {
      id: '5449267c-f513-4ebf-942f-898a77e2e1c7',
      name: 'Bacon',
      showName: 'Bacon',
      slid: 6
    },
    {
      id: '8bfa9e10-d53b-436a-9786-1fdd59228e79',
      name: 'Caprese',
      showName: 'Caprese',
      slid: 6
    },
    {
      id: 'f10241c4-449f-445f-a412-fd3e52315e26',
      name: 'Spinach',
      showName: 'Spinach',
      slid: 6
    },
    {
      id: '5d5bb03f-7353-4dfb-bb5b-4dcebd9578fb',
      name: 'Mushroom',
      showName: 'Mushroom',
      slid: 6
    },
    {
      id: '015d7af2-bf79-43fb-a6fa-6efb74532b8b',
      name: 'Corn',
      showName: 'Corn',
      slid: 6
    },
    {
      id: '791a1d74-d244-4095-80ae-1d56d3108a51',
      name: 'Onion',
      showName: 'Onion',
      slid: 6
    },
    {
      id: '61c5511d-32e8-4fdb-9b1e-113b1ad2da30',
      name: 'Broccoli',
      showName: 'Broccoli',
      slid: 6
    },
    {
      id: '3660c9d0-561c-4416-ad93-c5f280902232',
      name: 'Apple',
      showName: 'Apple',
      slid: 6
    },
    {
      id: 'a32df6ce-7433-4827-b14c-fdc5242bdfda',
      name: 'Banana',
      showName: 'Banana',
      slid: 6
    },
    {
      id: '5e182117-72d3-4b38-965d-26aa3fe4f87c',
      name: 'Pepperoni',
      showName: 'Pepperoni',
      slid: 6
    },
    {
      id: 'ed587252-660b-479c-8825-20b63d980b15',
      name: 'Buffalo Chick',
      showName: 'Buffalo Chick',
      slid: 6
    },
    {
      id: '5aa56503-6322-4c43-821a-648b443dd2fc',
      name: '4 Cheese',
      showName: '4 Cheese',
      slid: 6
    },
    {
      id: '2e2e8f0b-9932-4526-a3dc-567d718d9c8e',
      name: 'Spin',
      showName: 'Spin',
      slid: 6
    },
    {
      id: '5742fdcf-d72a-42b8-ab09-bca41fb7bc08',
      name: 'Potato',
      showName: 'Potato',
      slid: 6
    },
    {
      id: '375ddfa0-cdc0-45e2-a202-69edc3859ea7',
      name: 'Soy',
      showName: 'Soy',
      slid: 6
    },
    
  ]
};

const GELATO: CategoryInventory = {
  category: 'Gelato',
  formStyle: FormStyle.InputPlusSlider,
  unit: 'Container',  
  items: [
    {
      id: '426e7d57-219c-439b-a356-d2c68b7e31a2',
      name: 'Swiss Chocolate Couverture',
      showName: 'Swiss Chocolate Couverture',
      slid: 9,
    },
    {
      id: '9c4d6127-c3a5-4106-a6e2-3dfb6a2d31ed',
      name: 'Cappuccino Dark Chocolate Swirl',
      showName: 'Cappuccino Dark Chocolate Swirl',
      slid: 9,
    },
    {
      id: '85439bf7-27a0-47af-9668-b0864e99725e',
      name: 'Chocolate Almond Fudge',
      showName: 'Chocolate Almond Fudge',
      slid: 9,
    },
    {
      id: '0e39eca5-91b9-41ee-ae0c-770d817daa19',
      name: 'White Chocolate Raspberry',
      showName: 'White Chocolate Raspberry',
      slid: 9,
    },
    {
      id: '91f56fce-5aaf-4902-8622-71e079c4f76f',
      name: 'French Vanilla',
      showName: 'French Vanilla',
      slid: 9,
    },
    {
      id: '3ac642e8-458f-4078-aedb-42039ed2c537',
      name: 'Banana Walnut',
      showName: 'Banana Walnut',
      slid: 9,
    },
    {
      id: 'ca9abfed-3c0f-4c4b-94f9-f00f8feef0a0',
      name: 'Creme de menthe chip',
      showName: 'Creme de menthe chip',
      slid: 9,
    },
    {
      id: 'f84c1e1f-c10c-4fec-b63b-37bbf1ca0754',
      name: 'Fresh Strawberry',
      showName: 'Fresh Strawberry',
      slid: 9,
    },
    {
      id: '6a1de402-8259-4a94-ad56-c08e1143d82d',
      name: 'Italian Pistachio',
      showName: 'Italian Pistachio',
      slid: 9,
    },
    {
      id: 'd0c5a740-5f87-4958-b0b3-9c42c48d0a87',
      name: 'Fresh Mango SORBETTO',
      showName: 'Fresh Mango SORBETTO',
      slid: 9,
    },
    {
      id: '5a115a47-bf04-43f2-92bf-085f2034afaa',
      name: 'Fresh Coconut',
      showName: 'Fresh Coconut',
      slid: 9,
    },
    {
      id: '30895dbb-42ad-47c6-8d9a-967caf5392b4',
      name: 'Wildberry SORBETTO',
      showName: 'Wildberry SORBETTO',
      slid: 9,
    },
    {
      id: '5906ba7d-7103-41c3-a0bb-7940f71b070e',
      name: 'Orange Pineapple SORBETTO',
      showName: 'Orange Pineapple SORBETTO',
      slid: 9,
    },
  ]
};

const ALFAJORES: CategoryInventory = {
  category: 'Alfajores',
  formStyle: FormStyle.IsNeededInput,
  unit: 'Container',  
  items: [
    {
      id: '64812379-329e-4d13-8221-797aee356dbd',
      name: 'Coconut',
      showName: 'Coconut',
      slid: 6,
    },
    {
      id: '90f6342f-6ee7-40e7-98b7-33282c5f07ee',
      name: 'Dark Chocolate',
      showName: 'Dark Chocolate',
      slid: 6,
    },
    {
      id: 'd155260e-cdbe-4183-86e6-ede299bce862',
      name: 'Guava',
      showName: 'Guava',
      slid: 6,
    },
    {
      id: '4bc996ff-753a-44b5-96f7-02b5b869f268',
      name: 'Nutella',
      showName: 'Nutella',
      slid: 6,
    },
    {
      id: '0803a61c-9963-4e6a-bc3b-5682703d5d21',
      name: 'White Chocolate',
      showName: 'White Chocolate',
      slid: 6,
    },
    {
      id: '2fb8c9a7-179b-40e2-a9fb-860cfdd1dc0f',
      name: 'Guava Choco',
      showName: 'Guava Choco',
      slid: 6,
    },
  ]
};

const DRINKS: CategoryInventory = {
  category: 'Drinks',
  unit: 'Case',
  formStyle: FormStyle.InputPlusSlider,
  items: [
    {
      id: '06527099-14eb-48fc-a3f2-f646e7e46afc',
      name: 'Argo Tea: Carolina Honey',
      showName: 'Argo Tea: Carolina Honey',
      slid: 9,
    },
    {
      id: '0707f02e-54d5-4858-a8c2-1c16122a85b6',
      name: 'Argo Tea: Green Ginger Twist',
      showName: 'Argo Tea: Green Ginger Twist',
      slid: 9,
    },
    {
      id: '2172d970-9a50-45c7-ba28-6e8ddb37cb17',
      name: 'Argo Tea: Hibiscus Sangria',
      showName: 'Argo Tea: Hibiscus Sangria',
      slid: 9,
    },
    {
      id: 'f2ae679d-9367-4f37-98e7-760801fb5b5d',
      name: 'Argo Tea: Mojitea',
      showName: 'Argo Tea: Mojitea',
      slid: 9,
    },
    {
      id: '5de2f12d-a8c2-4dc0-bf2c-5496b50b3f78',
      name: 'Argo Tea: Unsweetened Apple',
      showName: 'Argo Tea: Unsweetened Apple',
      slid: 9,
    },
    {
      id: 'bec9cfdf-7a96-4910-bb0d-cfc9617bb82a',
      name: 'can: Coke',
      showName: 'can: Coke',
      slid: 9,
    },
    {
      id: '9a91198d-3657-4357-ae9d-7f51d29254c5',
      name: 'can: Diet Coke',
      showName: 'can: Diet Coke',
      slid: 9,
    },
    {
      id: 'e26098e3-a664-41c2-aec9-a00cef6d6a53',
      name: 'can: Fanta',
      showName: 'can: Fanta',
      slid: 9,
    },
    {
      id: '7c90c25f-05ae-4f18-b698-3b1b4908d4f0',
      name: 'can: Sprite',
      showName: 'can: Sprite',
      slid: 9,
    },
    {
      id: '174dcf21-6f7c-4f83-98d7-609b01dec77b',
      name: 'Mexican Bottle: Coke',
      showName: 'Mexican Bottle: Coke',
      slid: 9,
    },
    {
      id: '6b7b2de5-df73-4a76-8681-6a3c1fbae005',
      name: 'Mexican Bottle: Fanta',
      showName: 'Mexican Bottle: Fanta',
      slid: 9,
    },
    {
      id: '9ffca2d0-f3d4-416a-b05e-df42ff67097d',
      name: 'Mexican Bottle: Sprite',
      showName: 'Mexican Bottle: Sprite',
      slid: 9,
    },
    {
      id: '278357e8-51d8-4122-ae0e-c30bcb2d1d47',
      name: 'Nantucket: Apple',
      showName: 'Nantucket: Apple',
      slid: 9,
    },
    {
      id: '979004c3-472e-4443-be66-67952a875176',
      name: 'Nantucket: Lemonade',
      showName: 'Nantucket: Lemonade',
      slid: 9,
    },
    {
      id: '63209d51-d7da-471b-a83a-1e9a59a42af3',
      name: 'Nantucket: Orange',
      showName: 'Nantucket: Orange',
      slid: 9,
    },
    {
      id: 'c833c24d-b163-44a8-94f4-ab92145b676e',
      name: 'Nantucket: Orange Mango',
      showName: 'Nantucket: Orange Mango',
      slid: 9,
    },
    {
      id: '3ad4e830-dd3f-4b59-b630-8e1885bb8d80',
      name: 'San Pellegrino: Blood Orange',
      showName: 'San Pellegrino: Blood Orange',
      slid: 9,
    },
    {
      id: '5c3a809d-d5a1-4845-a4ef-8dda8c7708db',
      name: 'San Pellegrino: Clementine',
      showName: 'San Pellegrino: Clementine',
      slid: 9,
    },
    {
      id: '3afa4586-2f1d-4c71-8245-60cfc860610c',
      name: 'San Pellegrino: Grapefruit',
      showName: 'San Pellegrino: Grapefruit',
      slid: 9,
    },
    {
      id: 'd60c0720-4016-449a-bbb9-c0081a041f09',
      name: 'San Pellegrino: Lemon',
      showName: 'San Pellegrino: Lemon',
      slid: 9,
    },
    {
      id: '8afe8a66-548f-4d2e-8437-41056d3a5f30',
      name: 'San Pellegrino: Orange',
      showName: 'San Pellegrino: Orange',
      slid: 9,
    },
    {
      id: 'df070361-47d9-4c59-917f-4bfb7a4dd62b',
      name: 'San Pellegrino: Pomegranate',
      showName: 'San Pellegrino: Pomegranate',
      slid: 9,
    },
    {
      id: 'b47eac79-2246-44f7-a1e0-7625a4dcbbfc',
      name: 'San Pellegrino: Prickly Pear',
      showName: 'San Pellegrino: Prickly Pear',
      slid: 9,
    },
    {
      id: '281a0c02-7ca9-4b38-9335-8754a593b5dc',
      name: 'Water Bottle: Nestle',
      showName: 'Water Bottle: Nestle',
      slid: 9,
    },
  ]
}

const COFFEE: CategoryInventory = {
  category: 'Coffee',
  unit: '',
  formStyle: FormStyle.OnlyInput,
  items: [
    {
      id: '6f53de8b-7f9b-46de-aede-47f982275c28',
      name: 'Colectivo Toro Espresso Decaf Whole Bean (5lb)',
      showName: 'Colectivo Toro Espresso Decaf Whole Bean (5lb)',
      unit: ''
    },
    {
      id: '2fe49376-2cc4-40d6-8346-ae64eeec6eca',
      name: 'Colectivo Toro Espresso Whole Bean (5lb)',
      showName: 'Colectivo Toro Espresso Whole Bean (5lb)',
      unit: ''
    },
    {
      id: 'b7284dbb-df4c-42dd-b134-8185c77a7d8d',
      name: 'Lavazza Caffe Macinato Aroma Classic Filter #2459 (2.25oz Box of 30)',
      showName: 'Lavazza Caffe Macinato Aroma Classic Filter #2459 (2.25oz Box of 30)',
      unit: ''
    },
    {
      id: 'fcba528a-8b28-41b2-adfe-da5c97eb993e',
      name: 'LA2401 Lavazza Granfiltro REG 2.25oz. 30ct each',
      showName: 'LA2401 Lavazza Granfiltro REG 2.25oz. 30ct each',
      unit: ''
    },
    {
      id: '06edb1cc-26e1-4346-a60a-9754b3efdc99',
      name: 'LA2431 Lavazza Gran DARK ROAST 30/2.25 each',
      showName: 'LA2431 Lavazza Gran DARK ROAST 30/2.25 each',
      unit: ''
    },
    {
      id: 'b8e758df-16f1-4b3c-95f9-e0bf14f1e4e3',
      name: 'LA1081 LaVazza DECAF Grnd 2.25oz 30ct. each',
      showName: 'LA1081 LaVazza DECAF Grnd 2.25oz 30ct. each',
      unit: ''
    },
  ]
};

const TEA: CategoryInventory = {
  category: 'Tea',
  unit: '',
  formStyle: FormStyle.OnlyInput,
  items: [
    {
      id: '2b6a3649-9ec4-4394-af31-57f03edb9e10',
      name: 'Green Tea',
      showName: 'Green Tea',
      unit: ''
    },
    {
      id: '4516b811-e76f-4f2e-86dd-661ed9211f9c',
      name: 'Chamomile',
      showName: 'Chamomile',
      unit: ''
    },
    {
      id: '37e4c6a5-d042-4ccc-82d2-a1ef4cd3b6ae',
      name: 'Peppermint',
      showName: 'Peppermint',
      unit: ''
    },
    {
      id: 'c0543b05-b9d3-4e22-bdb9-5b18bccaf2c2',
      name: 'Chai Pyramid',
      showName: 'Chai Pyramid',
      unit: ''
    },
    {
      id: '5c76d75c-d1a2-4e47-ae03-c949d4ad3de2',
      name: 'Ginger Orange Blossom',
      showName: 'Ginger Orange Blossom',
      unit: ''
    },
  ]
};

// const HW: CategoryInventory = {};

const PRODUCE: CategoryInventory = {
  category: 'Produce',
  formStyle: FormStyle.OnlyInput,
  items: [
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Beef',
      showName: 'Beef',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Chicken',
      showName: 'Chicken',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Pork',
      showName: 'Pork',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Sausage',
      showName: 'Sausage',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Ham',
      showName: 'Ham',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'P. Skim Mozzarella',
      showName: 'P. Skim Mozzarella',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'W. Milk Mozzarella',
      showName: 'W. Milk Mozzarella',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Mix Cheese',
      showName: 'Mix Cheese',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Cream Cheese',
      showName: 'Cream Cheese',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Tuna',
      showName: 'Tuna',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Onions',
      showName: 'Onions',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Bacon',
      showName: 'Bacon',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Basil',
      showName: 'Basil',
      unit: '???'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Tomato',
      showName: 'Tomato',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Permesan',
      showName: 'Permesan',
      unit: 'oz'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Garlic',
      showName: 'Garlic',
      unit: 'oz'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Ricotta',
      showName: 'Ricotta',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Whole Kernel Corn',
      showName: 'Whole Kernel Corn',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Cream Style Corn',
      showName: 'Cream Style Corn',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Regular Oil',
      showName: 'Regular Oil',
      unit: 'oz'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Olive Oil',
      showName: 'Olive Oil',
      unit: 'oz'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Spinach',
      showName: 'Spinach',
      unit: 'units'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Mushroom',
      showName: 'Mushroom',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Green Onions',
      showName: 'Green Onions',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Broccoli',
      showName: 'Broccoli',
      unit: 'box'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Eggs',
      showName: 'Eggs',
      unit: 'units'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Green Olives',
      showName: 'Green Olives',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Black Olives',
      showName: 'Black Olives',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'BBQ sauce',
      showName: 'BBQ sauce',
      unit: 'cans'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Sour Cream',
      showName: 'Sour Cream',
      unit: 'oz'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Paprika',
      showName: 'Paprika',
      unit: 'oz'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'BBQ spice',
      showName: 'BBQ spice',
      unit: 'oz'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Scrambled egg liquid',
      showName: 'Scrambled egg liquid',
      unit: 'units'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Banana',
      showName: 'Banana',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Nutella',
      showName: 'Nutella',
      unit: 'units'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Green apple',
      showName: 'Green apple',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Apple Filling',
      showName: 'Apple Filling',
      unit: 'cans'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Black Pepper',
      showName: 'Black Pepper',
      unit: 'oz'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Brown sugar',
      showName: 'Brown sugar',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Lemon juice',
      showName: 'Lemon juice',
      unit: 'oz'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Cinnamon',
      showName: 'Cinnamon',
      unit: 'oz'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Corn starch',
      showName: 'Corn starch',
      unit: 'oz'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Green Pepper',
      showName: 'Green Pepper',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Cumin',
      showName: 'Cumin',
      unit: 'oz'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Sea salt',
      showName: 'Sea salt',
      unit: 'oz'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Kosher Salt',
      showName: 'Kosher Salt',
      unit: 'oz'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Oregano',
      showName: 'Oregano',
      unit: 'oz'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Nutmeg',
      showName: 'Nutmeg',
      unit: 'oz'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Aji molido',
      showName: 'Aji molido',
      unit: 'oz'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Red Pepper',
      showName: 'Red Pepper',
      unit: 'lb'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Butter',
      showName: 'Butter',
      unit: 'oz'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Milk',
      showName: 'Milk',
      unit: 'gallon'
      },
      {
      id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
      name: 'Cayenne Pepper',
      showName: 'Cayenne Pepper',
      unit: 'oz'
      },
  ],
};

const CLEANING: CategoryInventory = {
  category: 'Cleaning',
  formStyle: FormStyle.IsNeededInput,
  items: [
      {
        id: '0e66d0f3-8722-43ff-b089-986305013bc2',
        name: 'Aluminum Paper (12 x 500)',
        showName: 'Aluminum Paper (12 x 500)',
      },
      {
        id: 'c4b9e42f-c9b4-4960-96b5-4cd99883da30',
        name: 'Aluminum Tray: 1/2 size',
        showName: 'Aluminum Tray: 1/2 size',
      },
      {
        id: '92fe205d-0965-41db-991e-5b208851dc8c',
        name: 'Aluminum Tray: 1/4 size',
        showName: 'Aluminum Tray: 1/4 size',
      },
      {
        id: '4ce581a9-1194-49ef-b332-9829c5f457b4',
        name: 'Bags: Paper Brown - 2 lb',
        showName: 'Bags: Paper Brown - 2 lb',
      },
      {
        id: 'ff5db886-232a-409a-b7c4-1203a64d6bba',
        name: 'Bags: Thank you',
        showName: 'Bags: Thank you',
      },
      {
        id: '0e8e0bd0-8ced-410f-9778-d14792376878',
        name: 'Bags: Trash 40-46 X heavy',
        showName: 'Bags: Trash 40-46 X heavy',
      },
      {
        id: 'db266dba-d519-4d04-b81b-ce7f5f642421',
        name: 'Bags: Ziploc (freezer)',
        showName: 'Bags: Ziploc (freezer)',
      },
      {
        id: '6b352795-b5f5-4249-b5e4-c780e5993c6d',
        name: 'Bags: Ziploc (Storage: Quart)',
        showName: 'Bags: Ziploc (Storage: Quart)',
      },
      {
        id: 'fc19a897-b7fd-486a-9f7e-4dfb224de44b',
        name: 'Baking Sheet',
        showName: 'Baking Sheet',
      },
      {
        id: 'b4c00fe3-9055-4dc3-b60d-7a15fff579b9',
        name: 'Bleach',
        showName: 'Bleach',
      },
      {
        id: 'eae84bd3-c953-40be-bf5e-5109a5f28250',
        name: 'Bounty Paper',
        showName: 'Bounty Paper',
      },
      {
        id: 'f3424c49-5ac7-447f-a090-4b5a1d5fd3f5',
        name: 'Center Pull Paper Towel',
        showName: 'Center Pull Paper Towel',
      },
      {
        id: '95966933-d826-4475-b462-2eda1b28347c',
        name: 'Detergent: Dishes',
        showName: 'Detergent: Dishes',
      },
      {
        id: '198f0bdb-aa8c-4f33-985b-ddeaffc24825',
        name: 'Décor Towels',
        showName: 'Décor Towels',
      },
      {
        id: '377d2143-fc89-42ec-913b-e1a16ca2b4d1',
        name: 'Film Paper',
        showName: 'Film Paper',
      },
      {
        id: '774274ef-9380-409a-bf13-2948e38d49fb',
        name: 'Floor Cleaner',
        showName: 'Floor Cleaner',
      },
      {
        id: '11a01f2d-c45d-47e3-8d63-5c507cdc4304',
        name: 'Glass Cleaner (Easy-off)',
        showName: 'Glass Cleaner (Easy-off)',
      },
      {
        id: 'ba49b9a1-ddc0-45ff-b28d-b05dbdbb55ba',
        name: 'Glove: Oven',
        showName: 'Glove: Oven',
      },
      {
        id: 'ac99a34a-9728-4fd5-9e04-10c3eee87527',
        name: 'Gloves Vinyl: Large',
        showName: 'Gloves Vinyl: Large',
      },
      {
        id: '75890f5c-5905-443f-9d2f-ca3d7a6e951f',
        name: 'Gloves Vinyl: Medium',
        showName: 'Gloves Vinyl: Medium',
      },
      {
        id: 'd3ee37bb-4b88-4064-8544-1f392055b416',
        name: 'Hand Soap',
        showName: 'Hand Soap',
      },
      {
        id: '8663b118-9d5c-4d17-a8a3-022f6b22d552',
        name: 'Mop',
        showName: 'Mop',
      },
      {
        id: '5effb6d0-7c4a-45b4-91f5-14e94868081f',
        name: 'Oven Cleaner',
        showName: 'Oven Cleaner',
      },
      {
        id: 'd4a896fb-879d-4fca-ab9e-4b35d20ab212',
        name: 'Register Roll 3"',
        showName: 'Register Roll 3"',
      },
      {
        id: 'bdeba800-0d1e-4185-85c4-151949685d7b',
        name: 'Sponge: Metal',
        showName: 'Sponge: Metal',
      },
      {
        id: '96869830-aecc-4de2-8064-af55d2df8261',
        name: 'Sponge: Yellow',
        showName: 'Sponge: Yellow',
      },
      {
        id: 'c5b7a328-6f84-40fb-86f4-ca92c14cdce2',
        name: 'Stainless Steel Polish',
        showName: 'Stainless Steel Polish',
      },
      {
        id: '819da89e-7786-4ae7-9fb2-dbcbd8021678',
        name: 'Tape: Labeling (dissolve away)',
        showName: 'Tape: Labeling (dissolve away)',
      },
      {
        id: '2a6a9b57-2df6-40e3-9477-4f828d4a3c42',
        name: 'Toilet Paper',
        showName: 'Toilet Paper',
      },
      {
        id: 'fe590bcd-c8cf-44c9-a5a2-ac5b8444da86',
        name: 'Tong',
        showName: 'Tong',
      },
      {
        id: 'f099467e-1b11-42f3-b5d1-cb539f0bc3be',
        name: 'Trays - Food: 1 LB',
        showName: 'Trays - Food: 1 LB',
      },
      {
        id: 'ede57a20-36d6-4344-9f27-245df3f56a8a',
        name: 'Trays - Food: 2 LB',
        showName: 'Trays - Food: 2 LB',
      },
      {
        id: '02e53e29-9f4a-426d-9dda-d119e8907065',
        name: 'Trays - Food: 3 LB',
        showName: 'Trays - Food: 3 LB',
      },
  ]
};

const MATE: CategoryInventory = {
  category: 'Mate',
  formStyle: FormStyle.IsNeededInput,
  items: [
    {
      id: '9522a27a-a0e2-4e99-af32-2086b6d79ef4',
      name: 'Cup: Small',
      showName: 'Cup: Small',
    },
    {
      id: '1ff16a23-0ae5-431e-aa6b-c222604391f0',
      name: 'Cup: Large',
      showName: 'Cup: Large',
    },
    {
      id: '5103bae5-c1b5-4676-ac94-bfbdd6779706',
      name: 'Bombillas (independent)',
      showName: 'Bombillas (independent)',
    },
    {
      id: '1f809028-fd4c-4430-ac34-bf573ab83529',
      name: 'Nobleza Gaucha',
      showName: 'Nobleza Gaucha',
    },
    {
      id: '99d2de2e-253f-44ba-a849-22f362f8a4c5',
      name: 'CBSe Hierbas Serranas',
      showName: 'CBSe Hierbas Serranas',
    },
    {
      id: '6814a42e-60ab-4d16-ab12-c699946d62f3',
      name: 'CBSe Frutos Del Bosque',
      showName: 'CBSe Frutos Del Bosque',
    },
    {
      id: '8139ff4b-4b24-4d15-80e3-2a80f27670bd',
      name: 'CBSe Frutos Del Valle',
      showName: 'CBSe Frutos Del Valle',
    },
    {
      id: 'b096277d-7a39-423e-865d-879ec658a758',
      name: 'Mate Cocido',
      showName: 'Mate Cocido',
    },
  ]
};

const UTILITIES_FORFOOD: CategoryInventory = {
  category: 'For Food',
  formStyle: FormStyle.IsNeededInput,
  unit: 'Box',
  items: [
      {
        id: 'ef2b303b-c68f-4857-bd86-ab39c7681a9a',
        name: 'Coffee: Coffee Filters',
        showName: 'Coffee: Coffee Filters',
      },
      {
        id: 'adf4e0dd-fa3e-47cd-9699-6506bf09851c',
        name: 'Coffee: Lavazza Cups: 12 oz',
        showName: 'Coffee: Lavazza Cups: 12 oz',
      },
      {
        id: '9a4b5464-1e3e-4c75-99cc-c22df47e778a',
        name: 'Coffee: Lavazza Cups: 16 oz',
        showName: 'Coffee: Lavazza Cups: 16 oz',
      },
      {
        id: '317a0876-bdd5-4657-8088-9c682042776f',
        name: 'Coffee: Lavazza Cups: 20 oz',
        showName: 'Coffee: Lavazza Cups: 20 oz',
      },
      {
        id: '3235586d-d2e1-47d3-ad17-9c6156a9da83',
        name: 'Coffee: Lavazza Lids',
        showName: 'Coffee: Lavazza Lids',
      },
      {
        id: 'f8b765c8-cc44-4794-8824-9c7cf9c206e2',
        name: 'Coffee: Lavazza Sleeves',
        showName: 'Coffee: Lavazza Sleeves',
      },
      {
        id: '0cdad2b2-e942-486d-b573-335e0e7a99a3',
        name: 'Jar for CHIMI: 4 oz',
        showName: 'Jar for CHIMI: 4 oz',
      },
      {
        id: '978822bf-c5b5-4105-920c-453a1601e7c9',
        name: 'Jar Lid for CHIMI: 4 oz',
        showName: 'Jar Lid for CHIMI: 4 oz',
      },
      {
        id: '6f8359f2-088b-468e-a5f2-50a3f2cd247c',
        name: 'Container Cup: 1 oz',
        showName: 'Container Cup: 1 oz',
      },
      {
        id: '2b7d3e18-26f7-4363-93bb-04db67a0225f',
        name: 'Container Cup: 2 oz',
        showName: 'Container Cup: 2 oz',
      },
      {
        id: 'b2d9109d-b5ca-40c8-b881-da822c167b87',
        name: 'Container Cup Lid: 1 oz',
        showName: 'Container Cup Lid: 1 oz',
      },
      {
        id: '7ee72627-f1e3-43f2-bf92-c630ac2aa089',
        name: 'Container Cup Lid: 2 oz',
        showName: 'Container Cup Lid: 2 oz',
      },
      {
        id: '0998f2b1-701b-4c0d-bd74-4fd8e4962022',
        name: 'Container Gelato: Mini',
        showName: 'Container Gelato: Mini',
      },
      {
        id: '4f8f8ceb-126f-4438-9315-50ddb0f5b68a',
        name: 'Container Gelato: Small',
        showName: 'Container Gelato: Small',
      },
      {
        id: '329be945-6a9f-4c07-b739-db819608d0ef',
        name: 'Container Gelato: Medium',
        showName: 'Container Gelato: Medium',
      },
      {
        id: '562aeb29-72ab-4182-8d0c-ef588dd8fac6',
        name: 'Container Gelato: Large',
        showName: 'Container Gelato: Large',
      },
      {
        id: '036c4e1e-fb9b-4e15-ac6c-547a7716b19a',
        name: 'Container Gelato: Pint',
        showName: 'Container Gelato: Pint',
      },
      {
        id: '5d9a9419-411c-4aed-83e7-fa9129e2ae86',
        name: 'Container Gelato: Quart',
        showName: 'Container Gelato: Quart',
      },
      {
        id: 'db737cee-bd16-4b53-8cc0-13d6ad8e984e',
        name: 'Container Gelato Lid: Pint',
        showName: 'Container Gelato Lid: Pint',
      },
      {
        id: '23ed6917-28ee-45fb-9bee-9093a3cb4f39',
        name: 'Container Gelato Lid: Quart',
        showName: 'Container Gelato Lid: Quart',
      },
      {
        id: '03d48c36-d098-4550-b453-54231932234f',
        name: 'Container Soup: 12 oz',
        showName: 'Container Soup: 12 oz',
      },
      {
        id: 'eb6053c3-44b3-4271-aa66-7e7db3407e23',
        name: 'Container Soup: 16 oz',
        showName: 'Container Soup: 16 oz',
      },
      {
        id: 'e3a7545f-5785-495b-81dd-f326043c5254',
        name: 'Container Soup: 32 oz',
        showName: 'Container Soup: 32 oz',
      },
      {
        id: '81549d9c-0d2e-416e-9577-5fc5af0d08bf',
        name: 'Cont. Soup Lid: 12 & 16 oz',
        showName: 'Cont. Soup Lid: 12 & 16 oz',
      },
      {
        id: '02cd244a-71f2-4b8f-9cf4-753b659a88fa',
        name: 'Cont. Soup Lid: 32 oz',
        showName: 'Cont. Soup Lid: 32 oz',
      },
      {
        id: '81520f77-ec03-4729-93ae-af5b65ce9dcc',
        name: 'Container: Salad',
        showName: 'Container: Salad',
      },
      {
        id: 'd2a2a1a8-07d4-4bca-992e-9ec3b8cfaa10',
        name: 'Container To Go: Big',
        showName: 'Container To Go: Big',
      },
      {
        id: '6fdb1b20-bfa8-4c06-a59b-c837640c88ab',
        name: 'Container To Go: Small',
        showName: 'Container To Go: Small',
      },
      {
        id: 'c1a2c8e7-0aeb-4856-b0ef-45c1fad0c406',
        name: 'Cups: Water - 7 oz',
        showName: 'Cups: Water - 7 oz',
      },
      {
        id: '17cb0604-d0af-4cb5-92b1-ce610e6ede5b',
        name: 'Gelato Spoons (wood)',
        showName: 'Gelato Spoons (wood)',
      },
      {
        id: '84b07a9b-e3a8-45a0-b696-b68bda9a8386',
        name: 'Napkins: Interfold',
        showName: 'Napkins: Interfold',
      },
      {
        id: '035dc7bf-e29c-427e-9be1-67a2f72c5a4d',
        name: 'Pizza Box Wax Paper: 10in',
        showName: 'Pizza Box Wax Paper: 10in',
      },
      {
        id: '67d5064d-a651-4d3f-bb21-44dfa7fb12d3',
        name: 'Pizza Box: 12in',
        showName: 'Pizza Box: 12in',
      },
      {
        id: 'ca748145-aca9-49c7-b7ce-2ff48c873ff7',
        name: 'Pizza Box: 14in',
        showName: 'Pizza Box: 14in',
      },
      {
        id: '153cbabf-5749-4f17-b0d2-ec245893d078',
        name: 'Pizza Box: 16in',
        showName: 'Pizza Box: 16in',
      },
      {
        id: '25a1b72c-7ba8-45f7-9b62-b518466413f1',
        name: 'Pizza Box Wax Paper: 10in',
        showName: 'Pizza Box Wax Paper: 10in',
      },
      {
        id: '805e7ef6-b821-4d96-be72-5a60e7d43ad9',
        name: 'Pizza Box Wax Paper: 12in',
        showName: 'Pizza Box Wax Paper: 12in',
      },
      {
        id: 'dfe5666c-4f37-48eb-a67f-7cd95dfe150d',
        name: 'Pizza Box Wax Paper: 14in',
        showName: 'Pizza Box Wax Paper: 14in',
      },
      {
        id: 'fe26a1f8-d501-4a89-a347-c23a33bd5331',
        name: 'Pizza Box Wax Paper: 16in',
        showName: 'Pizza Box Wax Paper: 16in',
      },
      {
        id: 'ac1b3d36-c901-40a1-a1c3-1da3251b4e90',
        name: 'Plastic Silverware: Forks',
        showName: 'Plastic Silverware: Forks',
      },
      {
        id: '6e252372-7752-4c66-a4ca-238ebbe8f631',
        name: 'Plastic Silverware: Knives',
        showName: 'Plastic Silverware: Knives',
      },
      {
        id: '8744b575-9977-4aa3-b942-805a795d1d87',
        name: 'Plastic Silverware: Soup Spoons',
        showName: 'Plastic Silverware: Soup Spoons',
      },
      {
        id: '1f738db7-953d-4f66-a775-fcdd89c221aa',
        name: 'Plastic Silverware: Spoons',
        showName: 'Plastic Silverware: Spoons',
      },
      {
        id: '5de2ac28-9675-4546-a256-c90bad609097',
        name: 'Straws',
        showName: 'Straws',
      },
      {
        id: '3cc7feb1-5796-48bf-94b4-089b08d762d0',
        name: 'Wood Stirrers',
        showName: 'Wood Stirrers',
      },
     
  ]
};


export const INITIAL_INVENTORY_STRUCT: InventoryStructure  = {
    pages: [{
      name: 'Empanadas',
      categories: [EMPANADAS,FILLINGS]
    },
    {
      name: 'Dessert & Drinks',
      categories: [GELATO, ALFAJORES, DRINKS]
    },
    {
      name: 'Coffee',
      categories: [COFFEE,TEA]
    },
    {
      name: 'Raw materials',
      categories: [PRODUCE]
    },
    {
      name: 'Utilities',
      categories: [CLEANING, MATE ,UTILITIES_FORFOOD],
    }],
  };

  export const INITIAL_DAILY_INVENTORY_STRUCT: InventoryStructure = {
    pages: [{
      name: 'Empanadas',
      categories: [EMPANADAS,FILLINGS]
    },
    {
      name: 'Dessert & Drinks',
      categories: [GELATO, ALFAJORES, DRINKS]
    },
    {
      name: 'Others Items',
      itsOther: true,
      categories: [COFFEE,TEA, PRODUCE, CLEANING, MATE, UTILITIES_FORFOOD]
    }]
  }