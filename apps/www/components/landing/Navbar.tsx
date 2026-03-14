"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react";

const navLinks = [
	{ label: 'Home', href: '/' },
	{ label: 'About', href: '/about' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Contact', href: '/contact' },
]

const menuVariants = {
	hidden: { opacity: 0, height: 0 },
	visible: {
		opacity: 1,
		height: "auto",
		transition: {
			duration: 0.3,
			ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
		},
	},
	exit: {
		opacity: 0,
		height: 0,
		transition: { duration: 0.2, ease: "easeIn" as const },
	},
};

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const pathname = usePathname()

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 30)
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.header
			initial={{ y: -80, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled
					? 'glass border-b border-overlay-light shadow-lg shadow-black/20'
					: 'bg-transparent'
			}`}
		>
			<nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
				{/* Logo */}
				<Link href='/' className='flex items-center gap-2.5 group'>
					<Image
						src='/logo-icon.png'
						alt='BizRoss Logo'
						width={32}
						height={32}
						className='rounded-lg shadow-lg group-hover:shadow-primary/40 transition-shadow duration-300'
					/>
					<span className='font-bold text-lg text-foreground tracking-tight'>
						Biz<span className='gradient-text'>Ross</span>
					</span>
				</Link>

				{/* Desktop Links */}
				<ul className='hidden md:flex items-center gap-1'>
					{navLinks.map((link) => {
						const isActive = pathname === link.href
						return (
							<li key={link.label}>
								<Link
									href={link.href}
									className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
										isActive
											? 'text-foreground'
											: 'text-text-secondary hover:text-foreground hover:bg-surface'
									}`}
								>
									{isActive && (
										<motion.span
											layoutId='nav-active'
											className='absolute inset-0 bg-overlay-light rounded-lg'
											transition={{
												type: 'spring',
												stiffness: 380,
												damping: 30,
											}}
										/>
									)}
									<span className='relative z-10'>{link.label}</span>
								</Link>
							</li>
						)
					})}
				</ul>

				{/* Desktop CTAs */}
				<div className='hidden md:flex items-center gap-3'>
					<Link
						href='/sign-in'
						className='text-sm font-medium text-text-secondary hover:text-foreground transition-colors duration-200'
					>
						Log In
					</Link>
					<Link
						href='/sign-up'
						className='px-4 py-2 text-sm font-semibold text-foreground btn-primary rounded-lg hover:scale-105 active:scale-95 transition-all duration-300'
					>
						Start Free Trial
					</Link>
				</div>

				{/* Mobile Hamburger */}
				<button
					type='button'
					onClick={() => setMobileOpen((v) => !v)}
					className='md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-surface transition-colors'
					aria-label='Toggle menu'
				>
					<motion.span
						animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
						className='block w-5 h-0.5 bg-foreground origin-center transition-all'
					/>
					<motion.span
						animate={
							mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
						}
						className='block w-5 h-0.5 bg-foreground'
					/>
					<motion.span
						animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
						className='block w-5 h-0.5 bg-foreground origin-center transition-all'
					/>
				</button>
			</nav>

			{/* Mobile Menu */}
			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						variants={menuVariants}
						initial='hidden'
						animate='visible'
						exit='exit'
						className='md:hidden overflow-hidden glass border-t border-overlay-light'
					>
						<div className='px-4 py-4 flex flex-col gap-1'>
							{navLinks.map((link) => {
								const isActive = pathname === link.href
								return (
									<Link
										key={link.label}
										href={link.href}
										onClick={() => setMobileOpen(false)}
										className={`px-4 py-3 text-sm font-medium rounded-lg transition-all ${
											isActive
												? 'text-foreground bg-surface'
												: 'text-text-secondary hover:text-foreground hover:bg-surface-hover'
										}`}
									>
										{link.label}
									</Link>
								)
							})}
							<div className='pt-3 mt-2 border-t border-overlay-light flex flex-col gap-2'>
								<Link
									href='/sign-up'
									onClick={() => setMobileOpen(false)}
									className='px-4 py-3 text-sm font-semibold text-center text-foreground btn-primary rounded-lg'
								>
									Start Free Trial
								</Link>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.header>
	)
}
