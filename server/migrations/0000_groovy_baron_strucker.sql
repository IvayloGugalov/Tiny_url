CREATE TABLE `links` (
	`id` text(191) PRIMARY KEY NOT NULL,
	`target` text NOT NULL,
	`clicks` integer DEFAULT 0 NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
