import { XL } from '@zendeskgarden/react-typography'
import { useI18n } from '../hooks/useI18n'

const Modal = () => {
  const { t } = useI18n()
  return <XL isBold>{t('modal.title')}</XL>
}

export default Modal
