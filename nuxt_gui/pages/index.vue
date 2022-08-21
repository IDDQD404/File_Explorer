<template>
  <div @click="placeSelectMenu()" @dblclick="removeVideoPlayer()" v-if="access_token">
    Current path is {{CurrentPath}} <br>
    Full path is {{`${this.ServerAddress}?path=${this.CurrentPath}`}} <br>
    <div v-if="FileToUpload">
    File is {{`${this.FileToUpload.name}`}}
    </div>
    Token is {{access_token}} <br>

    <b-button variant="success" id="SelectMenu"
    @click="goBackInPath()"  >
      Go Back
    </b-button> 

    <b-button variant="success" id="SelectMenu"
    @click="createFolder()"  >
      Create New Folder
    </b-button> 

    <b-button variant="success" id="SelectMenu"
    @click="selectFile()"  >
      Upload File
    </b-button> 
    <!-- icon="BIconFolder" 
    icon="BIconFileEarmark" 
    icon="BIconFileEarmarkPlay"  -->
    <div v-if="showDecitionMenu" 
    style="position:absolute;z-index: 10;" :style="{ top: DecitionMneuYpos+'px', left: DecitionMneuXpos+'px' }" >
      <b-button variant="success" id="SelectMenu"
      >Open Folder</b-button> <br>
      <b-button variant="success" id="SelectMenu"
      >Download File</b-button> <br>
      <b-button variant="success" id="SelectMenu"
      >Delete</b-button> <br>
    </div>

    <br>

    <!-- this.foldersAndFilesTotal.length > 2 -->
    <div v-for="key in foldersAndFilesTotal.length" :key="key" style="display: inline-block; margin-left : 5px; 
    border: solid 0.1em; border-color: green;">
      <div @contextmenu.prevent="placeSelectMenu(key - 1)"
      v-if=" typeof(foldersAndFilesTotal !== 'undefined') ">
        <div>
          <b-icon v-if="checkTypeOfFile(key - 1) == 'video' " 
          @click="openVideo(key - 1)"
          icon="BIconFileEarmarkPlay" id="Icons"></b-icon>

          <b-icon v-else-if="checkTypeOfFile(key - 1) == 'file' "
          icon="BIconFileEarmark" id="Icons"></b-icon>

          <b-icon v-else-if="checkTypeOfFile(key - 1) == 'folder' "
          @click="openFolder(key - 1)"
          icon="BIconFolder" id="Icons"></b-icon>

          <br>
          {{key - 1}}
          <b-dropdown id="dropdown-dropup" dropup :text="foldersAndFilesTotal[key - 1]" variant="" class="m-2" style="z-index: 10;">
            <b-dropdown-item
            v-if="checkTypeOfFile(key - 1) == 'file' || checkTypeOfFile(key - 1) == 'video' "
            @click="downloadFile(key - 1)"
            >Download File
            </b-dropdown-item>
            
            <b-dropdown-item
            @click="deleteFileOrFolder(key -  1)"
            >Delete
            </b-dropdown-item>
          </b-dropdown>

        </div>
      </div>
    </div>

    <video v-if=" VideoPlayerSource != '' "
    :src="VideoPlayerSource" 
    controls
    id="VideoPlayer"></video>

    <b-form-file
      id="uploadFileMenu"
      v-model="FileToUpload"
      :state="Boolean(FileToUpload)"
      @change="uploadFile()"
      style="display:none"
    ></b-form-file>
  </div>
</template>

<script>
import axios from 'axios'
import { BIcon, BIconFolder , BIconFileEarmark , BIconFileEarmarkPlay } from 'bootstrap-vue'
import Vue from 'vue'

export default {
name: 'IndexPage',

components: {
  BIcon,
  BIconFolder,
  BIconFileEarmark,
  BIconFileEarmarkPlay,
},

  data() 
  {
    return {
      showDecitionMenu : false,
      DecitionMneuXpos : 0,
      DecitionMneuYpos : 0,
      VideoPlayerSource : '',
      FileToUpload : null,
      access_token : '',
      //
      ServerAddress : 'http://localhost:3000',
      CurrentPath : '',
      foldersAndFilesTotal : [],
    }
  },

  methods : 
  {

    placeSelectMenu(fileorfoldername)
    {
      if(fileorfoldername != null)
      {
        //this.showDecitionMenu = true
        this.showDecitionMenu = false
        this.DecitionMneuXpos = event.clientX
        this.DecitionMneuYpos = event.clientY
      }
      else
      {
        this.showDecitionMenu = false
      }
    },

    removeVideoPlayer()
    {
      this.VideoPlayerSource = ''
    },

    getPosition()
    {
        console.log(
          event.clientX,
          event.clientY
        )
    },

    checkTypeOfFile(index)
    {
      if( typeof  this.foldersAndFilesTotal[index] !== 'undefined' )
      {
      if( this.foldersAndFilesTotal[index].includes('.mp4') )
        {
          return 'video'
        }

      else if( this.foldersAndFilesTotal[index].includes('.') )
        {
          return 'file'
        }

      else if( !this.foldersAndFilesTotal[index].includes('.') )
        {
          return 'folder'
        }
      }

    },

    goBackInPath()
    {
      let TemplePath = this.CurrentPath.split('/').splice(1) 
      let NewTemplePath = ''
      /*
      TemplePath.forEach( function(element) { 
        if(element !== TemplePath[TemplePath.length]) 
        { 
          this.CurrentPath += `/${element}` } 
        })
      */

      TemplePath.forEach(function(element) {
          if ( element != TemplePath[TemplePath.length - 1] ) 
          {
            NewTemplePath += `/${element}`
          }
      })
      this.CurrentPath = NewTemplePath
      this.getAllFiles()
      this.$forceUpdate() 
    },

    openFolder(FolderID)
    {
      this.CurrentPath += `/${this.foldersAndFilesTotal[FolderID]}`
      this.getAllFiles()
      this.$forceUpdate() 
    },

    openVideo(VideoID)
    {
      //streamVideo?path=Folder%202/9.mp4
      let newVideoSource = `${this.ServerAddress}/streamVideo?path=${this.CurrentPath}/${this.foldersAndFilesTotal[VideoID]}`
      this.VideoPlayerSource = newVideoSource
      //alert(this.VideoPlayerSource)
    },
    
    /*this.$nuxt.refresh()*/

    getAllFiles()
    {
      axios.get( `${this.ServerAddress}?path=${this.CurrentPath}` )
      .then(response => this.foldersAndFilesTotal = response.data)
      .catch(error => {
        console.error("There was an error!", error.message);
      });
    },

    createFolder()
    {
      let newFolderName = prompt("Enter a new Folder name");
      
      if(newFolderName)
      {        
        axios({
          method: 'post',
          url: `${this.ServerAddress}/createFolder/?path=${this.CurrentPath}/${newFolderName}`,
          headers: {
            Authorization: 'Bearer ' + this.access_token
          }
        })
        .then( this.getAllFiles() , this.$forceUpdate() )
        .catch(error => {
          console.error("There was an error!", error.message);
        })
      }

      setTimeout(() => { 
        this.getAllFiles()
        this.$forceUpdate() 
      }, 1000)
      
    },

    selectFile()
    {
      document.getElementById('uploadFileMenu').click()
      //let newFileName = prompt("Enter a new Uploaded file name");
    },

    uploadFile()
    {
      setTimeout(() => { 
        let formData = new FormData();
        
        formData.append('file', this.FileToUpload)

          axios.post( `${this.ServerAddress}/upload/?path=${this.CurrentPath}` ,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + this.access_token
              }
            }
          )
          .then(response => { if(response.data.response == "Successfully Uploaded"){ this.getAllFiles() , this.$forceUpdate() } })
      }, 1000);
    },

    downloadFile(id)
    {
      let fileFullName = this.foldersAndFilesTotal[id]
      let fullName = fileFullName.split(/[.]/)
      let fileName = fullName[0]
      let extansionOfFile = fullName[1]

            
      axios({
          url: `${this.ServerAddress}/downloadFile?path=${this.CurrentPath}/${fileFullName}`,
          method: 'GET',
          responseType: 'blob',
      }).then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', fileName + '.' + extansionOfFile );
          document.body.appendChild(fileLink);
          fileLink.click();
      });

    },

    deleteFileOrFolder(id)
    {
      let fileFullName = this.foldersAndFilesTotal[id]
      if(this.CurrentPath)
      {
        axios.delete(`${this.ServerAddress}/?path=${this.CurrentPath}/${fileFullName}`, {
        headers: {
          Authorization: 'Bearer ' + this.access_token //the token is a variable which holds the token
        }
        })
      }
      else
      {
        axios.delete(`${this.ServerAddress}/?path=${fileFullName}`, {
        headers: {
          Authorization: 'Bearer ' + this.access_token //the token is a variable which holds the token
        }
        })
      }

      setTimeout(() => { 
        this.getAllFiles()
        this.$forceUpdate() 
      }, 1000);
    },

    login()
    {
      let username = prompt('Username')
      let password = prompt('Password');
        axios({
          method: 'post',
          url: `${this.ServerAddress}/auth/login/`,
          headers: {
            Authorization: 'Bearer ' + this.access_token
          }, 
          data: {
            "username": username,
            "password": password
          }
        }).then(response => this.access_token = response.data.access_token)

      username = null,
      password = null

    },

  },

  created() 
  {
    this.login()
    setInterval(this.getAllFiles() , this.$forceUpdate() ,10000);
  }


}

</script>

<style>

#SelectMenu
{
  min-width: 150px;
}

#Icons
{
  min-width: 5vw;
  min-height: 10vh;
}

#VideoPlayer
{
  position: absolute;
  z-index: 10;
  left: 10%;
  top: 10%;
  width: 80%;
  height: 80%;
}

</style>