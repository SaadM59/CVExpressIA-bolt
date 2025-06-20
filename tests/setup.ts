import '@testing-library/jest-dom';

// Mock Stripe
global.fetch = vi.fn();

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock environment variables
vi.mock('process', () => ({
  env: {
    OPENAI_API_KEY: 'test-openai-key',
    STRIPE_SECRET_KEY: 'sk_test_123',
    STRIPE_WEBHOOK_SECRET: 'whsec_test',
    SENDGRID_API_KEY: 'SG.test',
    BLOB_READ_WRITE_TOKEN: 'test-blob-token',
    NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
  }
}));