import { useEffect } from 'react'
import { useClient } from '../hooks/useClient'
import { useI18n } from '../hooks/useI18n'
import { Button } from '@zendeskgarden/react-buttons'

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
    <div>
      <h1>{t('ticket_sidebar.title')}</h1>
      <Button isPrimary onClick={handleNewInstance}>
        Open Modal Instance
      </Button>
    </div>
  )
}

export default TicketSideBar
