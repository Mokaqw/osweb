import React, { useEffect } from "react";
import axios from 'axios';
import {
  Form,  Input,  TextArea,  Button,  Image,  Message,  Header,  Divider  ,Select
} from "semantic-ui-react";
const schoolgroup = [
  {key:'1',name:'School of Integrative Medicine',text:'School of Integrative Medicine', value: 'School of Integrative Medicine'}
 ,{key:'2',name:'School of Cosmetic Science',text:'School of Cosmetic Science', value: 'School of Cosmetic Science'}
 ,{key:'3',name:'School of Dentistry',text:'School of Dentistry', value: 'School of Dentistry'}
 ,{key:'4',name:'School of Medicine',text:'School of Medicine', value: 'School of Medicine'}
 ,{key:'5',name:'School of Nursing',text:'School of Nursing', value: 'School of Nursing'}
 ,{key:'6',name:'School of Science',text:'School of Science', value: 'School of Science'}
 ,{key:'7',name:'School of Information Technology',text:'School of Information Technology', value: 'School of Information Technology'}
 ,{key:'8',name:'School of Social Innovation',text:'School of Social Innovation', value: 'School of Social Innovation'}
 ,{key:'9',name:'School of Agro-Industry',text:'School of Agro-Industry', value: 'School of Agro-Industry'}
 ,{key:'10',name:'School of Management',text:'School of Management', value: 'School of Management'}
 ,{key:'11',name:'School of Liberal Arts',text:'School of Liberal Arts', value: 'School of School of Law'}
 ,{key:'12',name:'School of Sinology',text:'School of Sinology' ,value: 'School of Sinology'}
 ,{key:'13',name:"School  of Law", text:"School  of Law", value: "School  of Law"}]
const INITIAL_PRODUCT = {
    name: "",
    price: "",
    description:"" ,
    example: "",
    uploadfile:"" ,
    school_of:"",
};

function CreateProduct() {
  const [product, setProduct] = React.useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState("");

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name === "example") {   
      setProduct(prevState => ({ ...prevState, example: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    }else if (name === "uploadfile") {   
        setProduct(prevState => ({ ...prevState, uploadfile: files[0] }));
    } else {
      setProduct(prevState => ({ ...prevState, [name]: value }));    
    }
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append('file', product.example);
    data.append('upload_preset', 'onesummary');
    data.append('cloud_name', 'moss4582');
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const example = response.data.url;
    return example;
  }



 async function handleSubmit(event) { 
    event.preventDefault();
    console.log(product);
    setLoading(true);
    const example = await handleImageUpload();
    const url = 'http://localhost:3000/api/product';
    const { name, price, description,school_of ,uploadfile } = product;
    const payload = { name, price, description, example ,school_of ,uploadfile };
    const response = await axios.post(url, payload);
    console.log({ response });
    setLoading(false);
    setProduct(INITIAL_PRODUCT);
    setSuccess(true);

}

  return (
    <>
      <Header as="h2" >
         Create you sheet
      </Header>
      <Divider />
      <Form   
        loading={loading}
        success={success}
        onSubmit={handleSubmit}>
            <Message error header="Oops!" content={error} />
        <Message
          success
          icon="check"
          header="Success!"
          content="Your product has been posted"
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            type="text"
            name="name"
            label="Name"
            placeholder="Name"
            value={product.name}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0"
            step="1"
            type="number"
            value={product.price}
            onChange={handleChange}
          />
             <Form.Field
              control={Select}
             options={schoolgroup}
            name="school_of"
            label="School of"
            placeholder="School of"
            value={product.school_of}
            onChange={
              (handleChange)=>{setProduct(handleChange.target)}}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          onChange={handleChange}
          value={product.description}
        />
          <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="example"
            type="file"
            label="Example page"
            accept="image/*"
            content="Select Image"
            onChange={handleChange}
          />
           <Form.Field
            control={Input}
            name="uploadfile"
            type="file"
            label="Upload"
            accept=".doc,.docx,.pdf"
            content="Select File"
            onChange={handleChange}
          />
          </Form.Group>
        <Form.Field
          control={Button}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />
      </Form>
    </>
  );
}

export default CreateProduct;