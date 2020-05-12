import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    try {
      if (!uploadedFiles.length) return;
      const arrayOfFiles: FormData[] = [];
      // TODO
      uploadedFiles.forEach(file => {
        const data = new FormData();
        data.append('file', file.file, file.name);
        arrayOfFiles.push(data);
      });
      await Promise.all(
        arrayOfFiles.map(file => api.post('/transactions/import', file)),
      );

      history.push('/');
    } catch (err) {
      console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    // TODO
    const filesToUpload = files.map(file => ({
      file,
      name: file.name,
      readableSize: filesize(file.size),
    }));
    const filesNames = uploadedFiles.map(file => file.name);
    const nonRepeatFiles = filesToUpload.filter(
      file => !filesNames.includes(file.name),
    );
    setUploadedFiles([...uploadedFiles, ...nonRepeatFiles]);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
