CREATE TABLE `notes` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`markdown` blob,
	`status` integer,
	`createdAt` integer,
	`updatedAt` integer
);
