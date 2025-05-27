# Makefile for Laravel project

.PHONY: install clean test serve migrate seed

install:
	composer install
	npm install

clean:
	rm -rf vendor node_modules
	rm -rf storage/framework/cache/* storage/framework/sessions/* storage/framework/views/*

test:
	php artisan test

serve:
	php artisan serve

migrate:
	php artisan migrate

seed:
	php artisan db:seed