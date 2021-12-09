import React, { useEffect } from "react";
import axios from 'axios';
import {
  Form,  Input,  TextArea,  Button,  Image,  Message,  Header,  Divider  ,Select
} from "semantic-ui-react";
import catchErrors from "../utils/catchErrors";
const schoolgroup = [
  {key:'1',name:'School of Integrative Medicine',text:'School of Integrative Medicine', value: ' Integrative Medicine'}
 ,{key:'2',name:'School of Cosmetic Science',text:'School of Cosmetic Science', value: ' Cosmetic Science'}
 ,{key:'3',name:'School of Dentistry',text:'School of Dentistry', value: 'Dentistry'}
 ,{key:'4',name:'School of Medicine',text:'School of Medicine', value: ' Medicine'}
 ,{key:'5',name:'School of Nursing',text:'School of Nursing', value: ' Nursing'}
 ,{key:'6',name:'School of Science',text:'School of Science', value: ' Science'}
 ,{key:'7',name:'School of Information Technology',text:'School of Information Technology', value: ' Information Technology'}
 ,{key:'8',name:'School of Social Innovation',text:'School of Social Innovation', value: 'Social Innovation'}
 ,{key:'9',name:'School of Agro-Industry',text:'School of Agro-Industry', value: ' Agro-Industry'}
 ,{key:'10',name:'School of Management',text:'School of Management', value: 'Management'}
 ,{key:'11',name:'School of Liberal Arts',text:'School of Liberal Arts', value: 'School of Law'}
 ,{key:'12',name:'School of Sinology',text:'School of Sinology' ,value: ' Sinology'}
 ,{key:'13',name:"School  of Law", text:"School  of Law", value: "School  of Law"}]
const INITIAL_PRODUCT = {
    name: "",
    price: "",
    description:"" ,
    exampleUrl: "",
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
    if (name === "exampleUrl") {   
      setProduct(prevState => ({ ...prevState, exampleUrl: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
   }else if (name === "uploadfile") {   
      setProduct(prevState => ({ ...prevState, uploadfile: files[0] }));
    } else {
      setProduct(prevState => ({ ...prevState, [name]: value }));    
    }
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append('file', product.exampleUrl);
    data.append('upload_preset', 'onsummary');
    data.append('cloud_name', 'moss4582');
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const exampleUrl = response.data.url;
    return exampleUrl;
  }
  async function handleImageUpload1() {
    const data = new FormData();
    data.append('file', product.uploadfile);
    data.append('upload_preset', 'onsummary');
    data.append('cloud_name', 'moss4582');
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const uploadfile = response.data.url;
    return uploadfile;
  }



  async function handleSubmit(event) {
   try {
      event.preventDefault();
      setLoading(true);
      setError("");
      const exampleUrl = await handleImageUpload();
      const uploadfile = await handleImageUpload1();
    const url = 'http://localhost:3000/api/product';
    const { name, price, description,school_of  } = product;
    const payload = { name, price, description, exampleUrl ,school_of , uploadfile  };
    const response = await axios.post(url, payload);
    console.log({ response });
    setLoading(false);
   setProduct(INITIAL_PRODUCT);
    setSuccess(true);
       } catch (error) {
     catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
}
  return (
    <>
      <Header as="h2" >
         Create you sheet
      </Header>
      <Divider />
      <Form   
        loading={loading}
        error={Boolean(error)}
        success={success}
        onSubmit={handleSubmit}>
            <Message error header="Oops!" content={error} />
        <Message
          success
          icon="check"
          header="Success!"
          content="Success"
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
              control={Input}
            name="school_of"
            label="School "
            placeholder="School "
            value={product.school_of}
            onChange={handleChange}
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
           name="uploadfile"
            type="file"
            label="File"
            accept="file/*"
            content="Select Image"
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="exampleUrl"
            type="file"
            label="Example page"
            accept="image/*"
            content="Select Image"
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