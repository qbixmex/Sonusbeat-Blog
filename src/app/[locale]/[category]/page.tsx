import { type FC } from 'react';
import PublicLayout from '@/app/(public)/public.layout';
import MainContainer from '@/components/main-container.component';
import { useTranslations } from 'next-intl';

const CategoryArticules: FC = () => {
  const translate = useTranslations('HomePage');

  return (
    <PublicLayout>
      <MainContainer>
        <h1 className="text-5xl font-black mb-10">{translate('title')}</h1>
      </MainContainer>
    </PublicLayout>
  );

};

export default CategoryArticules;
