import React from 'react';

import {Form, Input ,TextArea, Button , Image ,
  Icon ,Message ,Header ,Grid ,Divider ,Container, Label ,Select  } from 'semantic-ui-react'

function CreateProduct() {
  const SchoolOf = [
    { key: 'IM', text: 'School of Integrative Medicine', value: 'School of Integrative Medicine' },
    { key: 'CS', text: 'School of Cosmetic Science', value: 'School of Cosmetic Science' },
    { key: 'HS', text: 'School of Health Science', value: 'School of Health Science' },
    { key: 'Den', text: 'School of Dentistry', value: 'School of Dentistry' },
    { key: 'Med', text: 'School of Medicine', value: 'School of Medicine' },
    { key: 'Nurse', text: 'School of Nursing', value: 'School of Nursing' },
    { key: 'Science', text: 'School of Science', value: 'School of Science' },
    { key: 'IT', text: 'School of Information Technology  ', value: 'School of Information Technology' },
    { key: 'SI', text: 'School of Social Innovation', value: 'School of Social Innovation' },
    { key: 'AI', text: 'School of Agro-Industry', value: 'School of Agro-Industry ' },
    { key: 'MA', text: 'School of Management', value: 'male' },
    { key: 'LA', text: 'School of Liberal Arts    ', value: 'School of Liberal Arts' },
    { key: 'SINO', text: 'School of Sinology', value: 'School of Sinology' },
    { key: 'LAW', text: 'School of Law', value: 'School of Law' },

  ]
  const [product ,setProduct] = React.useState({
    name : "",
    price : "",
    description : "",
    school_of : "",
    example : "",
    uploadfile : "",

  })
function handleChange(event){
  const {name, value}=event.target
  setProduct({[name] : value})
  console.log(product)
}

  return <>  
  <Container textAlign='justified'>
  <Header as="h2" >
    Sell your sheet
  </Header>
  <Divider />

  <Form>
    <Form.Group >  
      <Form.Field 
      control ={Input} 
      name ="name " 
      label = "Product Name" 
      placeholder= "Name"
      onChange={handleChange} /> 
       <Form.Field 
       control ={Input} 
       name ="price " 
      label = "Price"
       placeholder= "Price" 
       type ="number" 
      min ="0"
       step ="1"
       onChange={handleChange} />
      <Form.Field
      control={Select}
       options={SchoolOf}
       name ="school_of " 
      label = "School of" 
      placeholder= "School of"
      onChange={handleChange} />
    </Form.Group> 
    <Form.Field 
    control ={Input}
    name ="description " 
      label = "Description"
       placeholder= "Description" 
       control ="textarea"
       onChange={handleChange} />
  </Form>
  <Form>
    <Form.Group >  
    <Form.Field 
    control ={Input} 
    name ="example " 
      placeholder= "Example page" 
      type ="file"
       content ="Select Image" 
      label = "Example Page" 
      accept ="image/*"
      onChange={handleChange} />
       <Form.Field 
       control ={Input} 
       name ="uploadfile " 
       placeholder= "Upload your Sheet" 
       type ="file"
        content ="Select file" 
      label = "Upload File"
      accept ="file/*"
      onChange={handleChange}  />
    </Form.Group> 
     </Form>
     <Form.Field 
     control={Button} 
     color ="blue"
      content ="Submit" 
      />
  </Container>
  </>;
}

export default CreateProduct;
