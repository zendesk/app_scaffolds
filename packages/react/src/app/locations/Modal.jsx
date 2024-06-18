import { useI18n } from '../hooks/useI18n'

const Modal = () => {
  const { t } = useI18n()
  return <h1>{t('modal.title')}</h1>
}

export default Modal
