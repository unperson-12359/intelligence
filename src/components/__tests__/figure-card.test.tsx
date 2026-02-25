import React from 'react';
import { render, screen } from '@testing-library/react';
import { FigureCard } from '@/components/figures/figure-card';

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string }) {
    return <a href={href} {...props}>{children}</a>;
  };
});

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: { src: string; alt: string }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  };
});

// Mock framer-motion (used by ScoreBadge)
jest.mock('framer-motion', () => ({
  motion: {
    circle: 'circle',
    div: 'div',
  },
  useInView: () => true,
}));

const defaultProps = {
  slug: 'john-doe',
  name: 'John Doe',
  title: 'Senator',
  type: 'politician',
  country: 'US',
  overallScore: 'B',
};

describe('FigureCard', () => {
  it('renders without crashing', () => {
    render(<FigureCard {...defaultProps} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('displays the figure name and title', () => {
    render(<FigureCard {...defaultProps} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Senator')).toBeInTheDocument();
  });

  it('links to the correct figure page', () => {
    render(<FigureCard {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/figure/john-doe');
  });

  it('displays the type badge', () => {
    render(<FigureCard {...defaultProps} />);
    expect(screen.getByText('Politician')).toBeInTheDocument();
  });

  it('displays party badge when provided', () => {
    render(<FigureCard {...defaultProps} party="Independent" />);
    expect(screen.getByText('Independent')).toBeInTheDocument();
  });

  it('displays state badge when provided', () => {
    render(<FigureCard {...defaultProps} state="NY" />);
    expect(screen.getByText('NY')).toBeInTheDocument();
  });

  it('displays statement and action counts', () => {
    render(<FigureCard {...defaultProps} totalStatements={12} totalActions={8} />);
    expect(screen.getByText('12 statements')).toBeInTheDocument();
    expect(screen.getByText('8 actions')).toBeInTheDocument();
  });

  it('displays broken count when greater than zero', () => {
    render(<FigureCard {...defaultProps} brokenCount={3} />);
    expect(screen.getByText('3 broken')).toBeInTheDocument();
  });

  it('does not display broken count when zero', () => {
    render(<FigureCard {...defaultProps} brokenCount={0} />);
    expect(screen.queryByText(/broken/)).not.toBeInTheDocument();
  });

  it('shows avatar placeholder when no image URL is provided', () => {
    render(<FigureCard {...defaultProps} />);
    const avatar = screen.getByRole('img', { name: /avatar for john doe/i });
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveTextContent('J');
  });

  it('shows image when imageUrl is provided', () => {
    render(<FigureCard {...defaultProps} imageUrl="/photos/john-doe.jpg" />);
    const img = screen.getByAltText('John Doe');
    expect(img).toHaveAttribute('src', '/photos/john-doe.jpg');
  });

  it('defaults statement and action counts to zero', () => {
    render(<FigureCard {...defaultProps} />);
    expect(screen.getByText('0 statements')).toBeInTheDocument();
    expect(screen.getByText('0 actions')).toBeInTheDocument();
  });
});
