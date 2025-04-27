// pages/Formulario.js
import React, { useState } from 'react';
import { TextField, MenuItem, Button, Container, Typography } from '@mui/material';

const Formulario = () => {
  const [formData, setFormData] = useState({
    dataEvento: '',
    ticket: '',
    quantidade: '',
    valorCorretagem: '',
    valorTaxasEmolumentos: '',
    valorUnitario: '',
    valorTotal: 0,
    compraOUVenda: '',
    corretora: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/transacao/insereTransacao', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Dados enviados com sucesso!');
      } else {
        alert('Erro ao enviar os dados');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados', error);
      alert('Erro ao enviar os dados');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Formulário de Ações</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Data do Evento"
          type="text"
          name="dataEvento"
          placeholder="dd/mm/yyyy"
          value={formData.dataEvento}
          onChange={(e) => {
            const { value } = e.target;
            const formattedValue = value
              .replace(/\D/g, '') // Remove caracteres não numéricos
              .replace(/(\d{2})(\d)/, '$1/$2') // Adiciona a primeira barra
              .replace(/(\d{2})(\d)/, '$1/$2') // Adiciona a segunda barra
              .slice(0, 10); // Limita o tamanho a 10 caracteres
            setFormData({ ...formData, dataEvento: formattedValue });
          }}
          fullWidth
          margin="normal"
          required
          inputProps={{
            maxLength: 10, // Limita o número máximo de caracteres
          }}
        />
        <TextField
          label="Ticket"
          type="text"
          name="ticket"
          value={formData.ticket}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
        </TextField>
        <TextField
          label="Quantidade"
          type="number"
          name="quantidade"
          value={formData.quantidade}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          inputProps={{ min: 1, max: 9999 }}
        />
        <TextField
          label="Valor da Corretagem"
          type="text"
          name="valorCorretagem"
          value={formData.valorCorretagem}
          onChange={(e) => {
            const { value } = e.target;
            const formattedValue = value
              .replace(/\D/g, '') // Remove caracteres não numéricos
              .replace(/(\d+)(\d{2})$/, '$1,$2'); // Adiciona a vírgula antes das duas últimas casas
            setFormData({ ...formData, valorCorretagem: formattedValue });
          }}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Valor das Taxas e Emolumentos"
          type="text"
          name="valorTaxasEmolumentos"
          value={formData.valorTaxasEmolumentos}
          onChange={(e) => {
            const { value } = e.target;
            const formattedValue = value
              .replace(/\D/g, '') // Remove caracteres não numéricos
              .replace(/(\d+)(\d{2})$/, '$1,$2'); // Adiciona a vírgula antes das duas últimas casas
            setFormData({ ...formData, valorTaxasEmolumentos: formattedValue });
          }}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Valor Unitário"
          type="text"
          name="valorUnitario"
          value={formData.valorUnitario}
          onChange={(e) => {
            const { value } = e.target;
            const formattedValue = value
              .replace(/\D/g, '') // Remove caracteres não numéricos
              .replace(/(\d+)(\d{2})$/, '$1,$2'); // Adiciona a vírgula antes das duas últimas casas
            setFormData({ ...formData, valorUnitario: formattedValue });
          }}
          fullWidth
          margin="normal"
          required
        />      
        <TextField
          label="Compra ou Venda"
          select
          name="compraOUVenda"
          value={formData.compraOUVenda}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="COMPRA">Compra</MenuItem>
          <MenuItem value="VENDA">Venda</MenuItem>
        </TextField>
        <TextField
          label="Corretora"
          select
          name="corretora"
          value={formData.corretora}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="CLEAR">CLEAR</MenuItem>
          <MenuItem value="NUBANK">NUBANK</MenuItem>
          <MenuItem value="XP">XP</MenuItem>
          <MenuItem value="BBDTVM">BBDTVM</MenuItem>          
        </TextField>
        <Button type="submit" variant="contained" color="primary">Enviar</Button>
      </form>
    </Container>
  );
};

export default Formulario;
