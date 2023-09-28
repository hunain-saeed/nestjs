import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { UpdateBookArgs } from './args/updatebook.args';
import { AddBookArgs } from './args/addbook.args';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private bookRepo: Repository<Book>) {}

  async findAllBooks(): Promise<Book[]> {
    const books = await this.bookRepo.find();
    return books;
  }

  async findBookById(id: number): Promise<Book> {
    const book = await this.bookRepo.findOne({ where: { id } });
    return book;
  }

  async deleteBook(id: number): Promise<string> {
    await this.bookRepo.delete(id);
    return 'book has been deleted';
  }

  async addBook(addBookArgs: AddBookArgs): Promise<string> {
    let book: Book = new Book();
    book.title = addBookArgs.title;
    book.price = addBookArgs.price;
    await this.bookRepo.save(book);
    return 'Book has been added';
  }
  async updateBook(updateBookArgs: UpdateBookArgs): Promise<string> {
    let book: Book = await this.bookRepo.findOne({
      where: { id: updateBookArgs.id },
    });
    book.title = updateBookArgs.title;
    book.price = updateBookArgs.price;
    await this.bookRepo.save(book);
    return 'Book has been added';
  }
}
