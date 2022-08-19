import React  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../reducers/user.reducer';
import { useState } from 'react';
import { uploadPicture } from "../../actions/user.actions" 
function UploadImg() {
 const { userData } = useSelector ( selectUser );
 const dispatch = useDispatch();
 const [file, setFile] = useState();

 const handlePicture = ( e ) => {
  e.preventDefault();
  const data = new FormData();
  data.append("userId", userData._id);
  data.append("file", file);

 dispatch ( uploadPicture( data,userData._id ) )

}

    
  return ( 
    <form action = "" onSubmit={ handlePicture } >
      <label htmlFor="file" > Changer d'image </label>
      <input 
      type = "file"
      id="file"
      name="file"
      title=""
      placeholder='he'
      accept=".jpg, .jpeg, .png"
      onChange={(e) => setFile(e.target.files[0])}

      />
      <br/>
      <input type ="submit" value="Envoyer"/>  
    </form>
  ) 
}

export default UploadImg ;