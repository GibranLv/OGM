import { h, render, Component } from 'preact';
import { isString } from 'underscore';

import constants from './../constants.js';

class File extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false,
      hover: false,
      gutter: 0,
      belowOrigin: false,
      alignment: 'left',
      stopPropagation: false
    });    
  }

  handleOpen() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let file = self.props.file;
      if (file.is_dir) {
        let name = file.name;
        self.props.onOpen(name);
      }
    };

    return fn;
  }

  handleDelete() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let file = self.props.file;

      if (file) {
        let f = 'el archivo';
        if (file.is_dir) {
          f = 'la carpeta';
        }

        let msg = `¿Desea eliminar ${f} ${file.name}?`
        let isOk = confirm(msg)
        if (isOk) {
          let id = file.id;
          self.props.onDelete(id);
        }
      }     
    };

    return fn;
  }

  handlePaste() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let file = self.props.file;
      if (file) {
        self.props.onPaste(file);
      }
    };

    return fn;
  }

  handleMove() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let file = self.props.file;
      if (file) {
        self.props.onMove(file);
      }
    };

    return fn;
  }

  handleCopy() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let file = self.props.file;
      if (file) {
        self.props.onCopy(file);
      }
    };

    return fn;
  }

  handleChangeName() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let file = self.props.file;
      if (file) {
        self.props.onOpenChangeName(file);
      }
    };

    return fn;
  }    

  getExtension(filename) {
    let value = filename.split('.').pop();
    if (value) {
      if (isString(value)) {
        value = value.toLowerCase();
      } 
    }

    return value;
  }

  render(props, state) {
    let file = props.file;

    let srcIcon = '/static/images/explorer/icon_empty_64.png';
    if (file.is_dir) {
      srcIcon = '/static/images/explorer/icon_directory_64.png';
    } else {
      let ext = this.getExtension(file.name);
      
      if (ext == constants.EXT_DOC || ext == constants.EXT_DOCX) {
        srcIcon = '/static/images/explorer/icon_docx_win_64.png';
      } else if (ext == constants.EXT_GIF) {
        srcIcon = '/static/images/explorer/icon_gif_64.png';
      } else if (ext == constants.EXT_JPEG || ext == constants.EXT_JPG) {
        srcIcon = '/static/images/explorer/icon_jpeg_64.png';
      } else if (ext == constants.EXT_MIDI) {
        srcIcon = '/static/images/explorer/icon_midi_64.png';
      } else if (ext == constants.EXT_MP3) {
        srcIcon = '/static/images/explorer/icon_mp3_64.png';
      } else if (ext == constants.EXT_MP4) {
        srcIcon = '/static/images/explorer/icon_mp4_64.png';
      } else if (ext == constants.EXT_PDF) {
        srcIcon = '/static/images/explorer/icon_pdf_64.png';
      } else if (ext == constants.EXT_PNG) {
        srcIcon = '/static/images/explorer/icon_png_64.png';
      } else if (ext == constants.EXT_PPT || ext == constants.EXT_PPTX) {
        srcIcon = '/static/images/explorer/icon_pptx_win_64.png';
      } else if (ext == constants.EXT_PUB) {
        srcIcon = '/static/images/explorer/icon_pub_64.png';
      } else if (ext == constants.EXT_RAR) {
        srcIcon = '/static/images/explorer/icon_rar_64.png';
      } else if (ext == constants.EXT_TXT) {
        srcIcon = '/static/images/explorer/icon_txt_64.png';
      } else if (ext == constants.EXT_VSD) {
        srcIcon = '/static/images/explorer/icon_vsd_64.png';
      } else if (ext == constants.EXT_WAV) {
        srcIcon = '/static/images/explorer/icon_wav_64.png';
      } else if (ext == constants.EXT_XLS || ext == constants.EXT_XLSX) {
        srcIcon = '/static/images/explorer/icon_xlsx_win_64.png';
      } else if (ext == constants.EXT_ZIP) {
        srcIcon = '/static/images/explorer/icon_zip_64.png';
      }
    }

    return (
      <div className="explorer-file">
        <table>
          <tbody>
            <tr>
              <td style="padding: 0px; text-align: center; width: 40%;">
                <img src={srcIcon} alt="Icono de Archivo" style="cursor: pointer; width: 64px; height: 64px; margin-top: 4px;" onDblClick={this.handleOpen()} />
              </td>
              <td style="padding: 0px; width: 50%;">
                <span hidden={!file.is_dir}>{file.name}</span>
                <a hidden={file.is_dir} href={'/server/explorers/download/' + file.id} target="_blank">{file.name}</a>
              </td>
              <td style="padding: 0px; text-align: right; width: 10%;">
                <a className='dropdown-button' href='#' data-activates={'dropdown' + file.id}>
                  <i className="material-icons">keyboard_arrow_down</i>
                </a>
                <ul id={'dropdown' + file.id} className='dropdown-content'>
                  <li style="text-align: center; min-height: 30px;">
                    <a href="#" onClick={this.handleChangeName()} style="padding: 0px; color: #080348;">
                      <i className="material-icons">edit</i>
                      &nbsp;Editar
                    </a>
                  </li>
                  <li hidden={file.is_dir} style="text-align: center; min-height: 30px;">
                    <a href={'/server/explorers/view/' + file.id} target="_blank" style="padding: 0px; color: #080348;">
                      <i className="material-icons">search</i>
                      &nbsp;Ver
                    </a>
                  </li>
                  <li style="text-align: center; min-height: 30px;" hidden={file.is_dir} onClick={this.handleCopy()}>
                    <a href="#" style="padding: 0px; color: #080348;">
                      <i className="material-icons">content_copy</i>
                      &nbsp;Copiar
                    </a>
                  </li>
                  <li style="text-align: center; min-height: 30px;" onClick={this.handleMove()}>
                    <a href="#" style="padding: 0px; color: #080348;">
                      <i className="material-icons">reply</i>
                      &nbsp;Mover
                    </a>
                  </li>
                  <li style="text-align: center; min-height: 30px;" hidden={!file.copy_ || !file.is_dir} onClick={this.handlePaste()}>
                    <a href="#" style="padding: 0px; color: #080348;">
                      <i className="material-icons">content_paste</i>
                      &nbsp;Pegar
                    </a>
                  </li>
                  <li style="text-align: center; min-height: 30px;" onClick={this.handleDelete()}>
                    <a href="#" style="padding: 0px; color: #080348;">
                      <i className="material-icons">delete</i>
                      &nbsp;Eliminar
                    </a>
                  </li>
                </ul>              
              </td>                            
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

/*

<i
  hidden={file.is_dir}
  className="material-icons"
  style="font-size: 48px; z-index: 100; color: #d4d4d4;"
  onDblClick={this.handleOpen()}>
  insert_drive_file
</i>

<i hidden={!file.is_dir}
  className="material-icons"
  style="font-size: 48px; z-index: 100; color: #d4d4d4 cursor: pointer;"
  onDblClick={this.handleOpen()}>
  folder
</i>

*/

export default File;