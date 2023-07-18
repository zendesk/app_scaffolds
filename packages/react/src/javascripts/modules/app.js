import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { ThemeProvider, DEFAULT_THEME } from '@zendeskgarden/react-theming';
import styled from 'styled-components';
import { Grid, Row, Col } from '@zendeskgarden/react-grid';
import { Input, Field, Label, Checkbox, Hint } from '@zendeskgarden/react-forms';
import { Table, Cell, Head, HeaderCell, HeaderRow, Body } from '@zendeskgarden/react-tables';
import { MdAddBox } from 'react-icons/md';

// Import dotenv and configure it
import dotenv from 'dotenv';
dotenv.config(); // This will load environment variables from .env

const StyledContainer = styled.div`
  margin-bottom: ${p => p.theme.space.xl};
  min-width: 500px;
`;

const StyledField = styled(Field)`
  margin-top: ${p => p.theme.space.xs};
`;

const App = () => {
  const [tableData, setTableData] = useState([]);
  const [serialNumValue, setSerialNumValue] = useState('');
  const [zenSerialNum, setZenSerialNum] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    initData();

    return () => {
      setIsMounted(false);
    };
  }, []);

  const initData = async () => {
    try {
      // Fetch initial data
      const client = ZAFClient.init();
      client.invoke('resize', { width: '100%', height: '500px' });

      const data = await client.get('ticket'); // Use 'client' to access the ZAFClient
      const { id: ticketID, comments } = data.ticket;
      const strippedComm = comments[1].value.replace(/(<([^>]+)>)/gi, '').replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&');
      setZenSerialNum(ticketID);

      console.log(data);

      const serialNumResponse = await client.get('ticket.customField:custom_field_360015798500');
      const serialNumValue = serialNumResponse['ticket.customField:custom_field_360015798500'];
      console.log(serialNumValue);

      setSerialNumValue(serialNumValue);
      setTableData([]);
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  };

  const handleMdAddBoxClick = async () => {
    try {
      const serialNum = serialNumValue;

      // Check if zenSerialNum is not empty before making the API call
      if (!serialNum) {
        console.warn('No serialNum available to make the API call.');
        return;
      }

      const url = process.env.REACT_APP_API_URL;

      const response = await fetch(`${url}?SerialNo=${serialNum}`, {
        headers: {
          Authorization: process.env.REACT_APP_API_BASIC,
        },
      });

      if (isMounted && response.ok) {
        const data = await response.json();
        console.log('Received data from API:', data);
        setTableData([data]);
      } else {
        console.error('Failed to fetch data:', response);
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  };

  return (
    <ThemeProvider theme={{ ...DEFAULT_THEME }}>
      <StyledContainer>
        <Grid>
          <span>Serial Number: {serialNumValue}</span>
          <Row>
            <Col>
              <form>
                <Field>
                  <Label>Serial Number</Label>
                  {zenSerialNum ? (
                    <Input type="text" value={zenSerialNum} readOnly />
                  ) : (
                    <Input type="text" value="No data found" readOnly />
                  )}
                </Field>
              </form>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <form>
                <Field>
                  <Label>Linked Case</Label>
                  <Row>
                    <Col size="auto">
                      <Input placeholder="ERP Case Number." />
                    </Col>
                    <Col size="auto">
                      <div onClick={handleMdAddBoxClick}>
                        <MdAddBox size={40} color="black" />
                      </div>
                    </Col>
                  </Row>
                </Field>
              </form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table style={{ minWidth: 500 }}>
                <Head>
                  <HeaderRow>
                    <HeaderCell>Packing Slip</HeaderCell>
                    <HeaderCell>Ship Date</HeaderCell>
                    <HeaderCell>Invoiced</HeaderCell>
                  </HeaderRow>
                </Head>
                <Body>
                  {tableData.map((rowData, index) => (
                    <Row key={index}>
                      <Cell>{rowData.SerialNo_PartNum}</Cell>
                      <Cell>{rowData.ShipHead_ShipDate}</Cell>
                      <Cell>{rowData.SerialNo_SNStatus}</Cell>
                    </Row>
                  ))}
                </Body>
              </Table>
              <hr />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Title>Sold To</Title>
              {tableData.length > 0 && tableData[0].Customer_CustID ? (
                <Input type="text" value={tableData[0].Customer_CustID} readOnly />
              ) : (
                <Input type="text" value="No data found" readOnly />
              )}
            </Col>
            <Col>
              <Title>Ship To</Title>
              {tableData.length > 0 && tableData[0].ShipTo_ShipToNum ? (
                <Input type="text" value={tableData[0].ShipTo_ShipToNum} readOnly />
              ) : (
                <Input type="text" value="No data found" readOnly />
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Title>Active Contract</Title>
              {tableData.length > 0 && tableData[0].FSContSN_ContractNum ? (
                <Input type="text" value={tableData[0].FSContSN_ContractNum} readOnly />
              ) : (
                <Input type="text" value="No active contract found" readOnly />
              )}
            </Col>
            <Col>
              <Field>
                <Checkbox defaultChecked={tableData.length > 0 && tableData[0].Calculated_Material}>
                  <Label>Materials</Label>
                  <Hint>Materials Found?</Hint>
                </Checkbox>
              </Field>
              <StyledField>
                <Checkbox defaultChecked={tableData.length > 0 && tableData[0].Calculated_Labour}>
                  <Label>Labour</Label>
                  <Hint>Labour Found?</Hint>
                </Checkbox>
              </StyledField>
            </Col>
          </Row>
        </Grid>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default App;

