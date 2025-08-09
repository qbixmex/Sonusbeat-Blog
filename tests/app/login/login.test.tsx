import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import LoginPage from '@/app/[locale]/login/page';

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    $connect: vi.fn(),
    $disconnect: vi.fn(),
  },
}));

// Mock auth configuration
vi.mock('@/auth.config', () => ({
  // Returns null (there is no session)
  auth: vi.fn(() => Promise.resolve(null))
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({ redirect: vi.fn() }));

// Mock next/server
vi.mock('next/server', () => ({
  NextRequest: vi.fn(),
  NextResponse: {
    json: vi.fn(),
    redirect: vi.fn(),
  },
}));

// Mock next/headers
vi.mock('next/headers', () => ({
  headers: () => new Map(),
  cookies: () => ({
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
  }),
}));

// Mock next-intl
vi.mock('next-intl', async () => {
  const current = await vi.importActual('next-intl');
  return {
    ...current,
    useTranslations: () => (key: string) => key,
    getTranslations: () => (key: string) => key,
  };
});

// Mocking LanguageSwitcher component
vi.mock('@/app/admin/(components)/navbar/language-switcher.component', () => ({
  default: () => <div data-testid="language-switcher">Language Switcher</div>,
}));

// Mock LoginForm component
vi.mock('@/app/[locale]/login/(components)/login-form.component', () => ({
  default: () => <div data-testid="login-form">Login Form</div>,
  LoginForm: () => <div data-testid="login-form">Login Form</div>,
}));

describe('Tests on <LoginPage />', () => {
  test('Should render login page when user is not authenticated', async () => {
    const LoginPageResolved = await LoginPage();

    render(
      <NextIntlClientProvider locale="en" messages={{}}>
        {LoginPageResolved}
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
  });
});
