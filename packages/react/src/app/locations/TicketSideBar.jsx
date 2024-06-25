import { useEffect } from 'react'
import { useClient } from '../hooks/useClient'
import { useI18n } from '../hooks/useI18n'
import { Button } from '@zendeskgarden/react-buttons'
import { Grid, Row } from '@zendeskgarden/react-grid'
import { XL } from '@zendeskgarden/react-typography'
import styled from 'styled-components'

const TicketSideBar = () => {
  const client = useClient()
  const { t } = useI18n()

  const handleNewInstance = () => {
    client.invoke('instances.create', {
      location: 'modal',
      url: import.meta.env.VITE_ZENDESK_LOCATION,
      size: {
        width: '650px',
        height: '400px'
      }
    })
  }

  useEffect(() => {
    client.invoke('resize', { width: '100%', height: '450px' })
  }, [client])

  return (
    <GridContainer>
      <Row justifyContent="center">
        <XL isBold>{t('ticket_sidebar.title')}</XL>
      </Row>
      <Row justifyContent="center">
        <Button isPrimary onClick={handleNewInstance}>
          Open Modal Instance
        </Button>
      </Row>
    </GridContainer>
  )
}

const GridContainer = styled(Grid)`
  display: grid;
  gap: ${(props) => props.theme.space.sm};
`

export default TicketSideBar
