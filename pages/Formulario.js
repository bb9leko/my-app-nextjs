import React, { useState } from 'react';
import { TextField, MenuItem, Button, Container, Typography } from '@mui/material';
import styles from '../styles/Formulario.module.css';

const Formulario = () => {
  const [formData, setFormData] = useState({
    dataEvento: '',
    classificacaoAtivo: '',
    ticket: '',
    quantidade: '',
    valorCorretagem: '',
    valorTaxasEmolumentos: '',
    valorTaxaLiquidacao: '',
    valorImpostos: '',
    outrosValoresCobrados: '',
    valorUnitario: '',
    valorTotal: 0,
    compraOUVenda: '',
    corretora: '',
    valorTotalComCustosEDespesas: 0
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
        method: 'POST',
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
    <Container className={styles.container}>
      <Typography variant="h4" className={styles.title}>Transações</Typography>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Primeira linha: Ticket, Data do Evento */}
        <TextField
          label="Tipo Ativo"
          select
          name="classificacaoAtivo"
          value={formData.classificacaoAtivo}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          className={styles.textField}
        >
          <MenuItem value="ACOES">Ações</MenuItem>
          <MenuItem value="FIIS">FIIs</MenuItem>
          <MenuItem value="ETFS">ETFs</MenuItem>
          <MenuItem value="TESOURO_NACIONAL">Tesouro Nacional</MenuItem>          
        </TextField>
        <TextField
          label="Ticket"
          type="text"
          name="ticket"
          value={formData.ticket}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          className={styles.textField}
        />
        <TextField
          label="Data do Evento"
          type="text"
          name="dataEvento"
          placeholder="dd/mm/yyyy"
          value={formData.dataEvento}
          onChange={(e) => {
            const { value } = e.target;
            const formattedValue = value
              .replace(/\D/g, '')
              .replace(/(\d{2})(\d)/, '$1/$2')
              .replace(/(\d{2})(\d)/, '$1/$2')
              .slice(0, 10);
            setFormData({ ...formData, dataEvento: formattedValue });
          }}
          fullWidth
          margin="normal"
          required
          inputProps={{
            maxLength: 10,
          }}
          className={styles.textField}
        />

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
          className={styles.textField}
        />
        <TextField
          label="Valor Unitário"
          type="text"
          name="valorUnitario"
          value={formData.valorUnitario}
          onChange={(e) => {
            const { value } = e.target;
            const formattedValue = value
              .replace(/\D/g, '')
              .replace(/(\d+)(\d{2})$/, '$1.$2');
            setFormData({ ...formData, valorUnitario: formattedValue });
          }}
          fullWidth
          margin="normal"
          required
          className={styles.textField}
        />

        <TextField
          label="Valor da Corretagem"
          type="text"
          name="valorCorretagem"
          value={formData.valorCorretagem}
          onChange={(e) => {
            const { value } = e.target;
            const formattedValue = value
              .replace(/\D/g, '')
              .replace(/(\d+)(\d{2})$/, '$1.$2');
            setFormData({ ...formData, valorCorretagem: formattedValue });
          }}
          fullWidth
          margin="normal"
          required
          className={styles.textField}
        />
        <TextField
          label="Valor das Taxas e Emolumentos"
          type="text"
          name="valorTaxasEmolumentos"
          value={formData.valorTaxasEmolumentos}
          onChange={(e) => {
            const { value } = e.target;
            const formattedValue = value
              .replace(/\D/g, '')
              .replace(/(\d+)(\d{2})$/, '$1.$2');
            setFormData({ ...formData, valorTaxasEmolumentos: formattedValue });
          }}
          fullWidth
          margin="normal"
          required
          className={styles.textField}
        />

        <TextField
          label="Taxa de Liquidação"
          type="text"
          name="valorTaxaLiquidacao"
          value={formData.valorTaxaLiquidacao}
          onChange={(e) => {
            const { value } = e.target;
            const formattedValue = value
              .replace(/\D/g, '')
              .replace(/(\d+)(\d{2})$/, '$1.$2');
            setFormData({ ...formData, valorTaxaLiquidacao: formattedValue });
          }}
          fullWidth
          margin="normal"
          required
          className={styles.textField}
        />

        <TextField
          label="Valor Impostos"
          type="text"
          name="valorImpostos"
          value={formData.valorImpostos}
          onChange={(e) => {
            const { value } = e.target;
            const formattedValue = value
              .replace(/\D/g, '')
              .replace(/(\d+)(\d{2})$/, '$1.$2');
            setFormData({ ...formData, valorImpostos: formattedValue });
          }}
          fullWidth
          margin="normal"
          required
          className={styles.textField}
        />

        <TextField
          label="Outros Valores"
          type="text"
          name="outrosValoresCobrados"
          value={formData.outrosValoresCobrados}
          onChange={(e) => {
            const { value } = e.target;
            const formattedValue = value
              .replace(/\D/g, '')
              .replace(/(\d+)(\d{2})$/, '$1.$2');
            setFormData({ ...formData, outrosValoresCobrados: formattedValue });
          }}
          fullWidth
          margin="normal"
          required
          className={styles.textField}
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
          className={styles.textField}
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
          className={styles.textField}
        >
          <MenuItem value="CLEAR">CLEAR</MenuItem>
          <MenuItem value="NUBANK">NUBANK</MenuItem>
          <MenuItem value="XP">XP</MenuItem>
          <MenuItem value="BBDTVM">BBDTVM</MenuItem>
        </TextField>
        
        <Button type="submit" variant="contained" className={styles.button}>
          Enviar
        </Button>
      </form>
    </Container>
  );
};

export default Formulario;