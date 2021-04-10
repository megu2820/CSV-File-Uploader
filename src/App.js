import React, { Component } from 'react'; //different
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import $ from 'jquery';



class App extends Component{
  render(){
    return(
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <form method="post" action="#" id="#">
                      <div className="form-group files">
                        <label>Upload Your File </label>
                        <input type="file" name="file" onChange={this.onChangeHandler} className="form-control" multiple></input>
                      </div>
                      <button type="button" className="btn btn-block btn-success" onClick={this.onClickHandler}>Upload</button>
                  </form>
              </div>

              </div>
              <br/>
              <h4 className="text-center">Selected Files</h4>
              <div className="row" id="selectedFilesPreview">
              </div>
              <br/>
              <h4 className="text-center">Uploaded Files</h4>
              <div className="row" id="previewdiv">
              </div>
            </div>

          )
  }
    onChangeHandler=event=>{
      var files = event.target.files;
      if(this.checkMimeType(event)){

    Object.values(event.target.files).forEach(function (fileObj){
        $('#selectedFilesPreview').append('<div class="col-sm-12 col-md-6 col-lg-6 col-xl-6"><h5 class="text-center">'+fileObj.name+'</h5></div><div class="col-sm-12 col-md-6 col-lg-6 col-xl-6"><button class="btn btn-success btn-block parse">Parse</button></div>');
        // console.log(fileObj.name);
    });

     this.setState({
        selectedFile:event.target.files,
        loaded:0,
      })
      
    }
    }
    constructor(props){
      super(props);
      this.state={ selectedFile:null}
    }

    onClickHandler = () => {
      const data = new FormData()
      for(var x = 0; x<this.state.selectedFile.length; x++) {
         data.append('file', this.state.selectedFile[x])
     }

     axios.post("http://localhost:8000/upload", data, { 
        // receive two    parameter endpoint url ,form data
    })
     .then(res => { // then print response status
      // console.log(res);
      res.data.forEach(function (file){
          $('#previewdiv').append('<div class="col-sm-12 col-md-6 col-lg-6 col-xl-6"><h5 class="text-center">'+file+'</h5></div><div class="col-sm-12 col-md-6 col-lg-6 col-xl-6"><button class="btn btn-success btn-block parse">Parse</button></div>');
      });

   })

     
  }


  //getting file object
  let files = event.target.files 
  //define message container
  let err = ''
  // list allow file types
 const types = ['csv'];
  // loop access array
  for(var x = 0; x<files.length; x++) {
   // compare file type find doesn't matach
       if (!(types.includes(files[x].name.split(".")[1]))) {
       // create error message and assign to container   
       err += files[x].name+' is not a supported format\n';
     }
   };

 if (err !== '') { // if message not same old that mean has error 
      event.target.value = null // discard selected file
      alert(err);
       return false; 
  }
 return true;

}



}

export default App;






