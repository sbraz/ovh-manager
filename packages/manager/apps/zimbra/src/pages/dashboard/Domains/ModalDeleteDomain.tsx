import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ODS_THEME_COLOR_INTENT,
  ODS_THEME_TYPOGRAPHY_SIZE,
  ODS_THEME_TYPOGRAPHY_LEVEL,
  ODS_THEME_COLOR_HUE,
} from '@ovhcloud/ods-common-theming';
import { ODS_ICON_NAME } from '@ovhcloud/ods-components';
import { OsdsMessage, OsdsText } from '@ovhcloud/ods-components/react';
import { useNotifications } from '@ovh-ux/manager-react-components';
import { useAccountList, useGenerateUrl, usePlatform } from '@/hooks';
import { deleteZimbraPlatformDomain } from '@/api/domain';
import Modal from '@/components/Modals/Modal';

export default function ModalDeleteDomain() {
  const { t } = useTranslation('domains/delete');
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const deleteDomainId = searchParams.get('deleteDomainId');

  const { platformId } = usePlatform();
  const { data, isLoading } = useAccountList({
    domainId: deleteDomainId,
  });

  const { addError, addSuccess } = useNotifications();

  const [hasEmailAccount, setHasEmailAccount] = useState(false);

  const goBackUrl = useGenerateUrl('..', 'path');
  const onClose = () => navigate(goBackUrl);

  useEffect(() => {
    setHasEmailAccount(data?.length > 0);
  }, [isLoading]);

  const handleDeleteClick = () => {
    deleteZimbraPlatformDomain(platformId, deleteDomainId)
      .then(() => {
        onClose();
        addSuccess(
          <OsdsText
            color={ODS_THEME_COLOR_INTENT.text}
            size={ODS_THEME_TYPOGRAPHY_SIZE._100}
            level={ODS_THEME_TYPOGRAPHY_LEVEL.body}
            hue={ODS_THEME_COLOR_HUE._500}
          >
            {t('zimbra_domain_delete_success_message')}
          </OsdsText>,
          true,
        );
      })
      .catch(({ response }) => {
        onClose();
        addError(
          <OsdsText
            color={ODS_THEME_COLOR_INTENT.text}
            size={ODS_THEME_TYPOGRAPHY_SIZE._100}
            level={ODS_THEME_TYPOGRAPHY_LEVEL.body}
            hue={ODS_THEME_COLOR_HUE._500}
          >
            {t('zimbra_domain_delete_error_message', {
              error: response.data.message,
            })}
          </OsdsText>,
          true,
        );
      });
  };

  return (
    <Modal
      title={t('zimbra_domain_delete_modal_title')}
      color={ODS_THEME_COLOR_INTENT.warning}
      onDismissible={onClose}
      dismissible={true}
      isLoading={isLoading}
      primaryButton={{
        label: t('zimbra_domain_delete'),
        action: handleDeleteClick,
        disabled: hasEmailAccount,
        testid: 'delete-btn',
      }}
    >
      <>
        <OsdsText
          color={ODS_THEME_COLOR_INTENT.text}
          size={ODS_THEME_TYPOGRAPHY_SIZE._100}
          level={ODS_THEME_TYPOGRAPHY_LEVEL.body}
          hue={ODS_THEME_COLOR_HUE._500}
        >
          {t('zimbra_domain_delete_modal_content')}
        </OsdsText>
        {hasEmailAccount && (
          <OsdsMessage
            color={ODS_THEME_COLOR_INTENT.error}
            icon={ODS_ICON_NAME.WARNING_CIRCLE}
            className="mt-4"
            data-testid="banner-message"
          >
            <div className="flex flex-col text-left ml-4">
              <OsdsText
                color={ODS_THEME_COLOR_INTENT.text}
                size={ODS_THEME_TYPOGRAPHY_SIZE._100}
                level={ODS_THEME_TYPOGRAPHY_LEVEL.heading}
                hue={ODS_THEME_COLOR_HUE._500}
              >
                {t('zimbra_domain_delete_modal_message_disabled_part1')}
              </OsdsText>
              <OsdsText
                color={ODS_THEME_COLOR_INTENT.text}
                size={ODS_THEME_TYPOGRAPHY_SIZE._100}
                level={ODS_THEME_TYPOGRAPHY_LEVEL.body}
                hue={ODS_THEME_COLOR_HUE._500}
              >
                {t('zimbra_domain_delete_modal_message_disabled_part2')}
              </OsdsText>
            </div>
          </OsdsMessage>
        )}
      </>
    </Modal>
  );
}
