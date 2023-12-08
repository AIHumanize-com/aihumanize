from django.shortcuts import render
from django.views import generic
from .models import Post, Category
from django.db.models import Count
# Create your views here.


class PostList(generic.ListView):
    queryset = Post.objects.filter(is_draft=False).order_by("-date_posted")
    template_name = "blog/blog_list.html"
    paginate_by = 9

    def get_context_data(self, **kwargs):
        context = super(PostList, self).get_context_data(**kwargs)
        categories = Category.objects.annotate(post_count=Count("post"))
        context["categories"] = categories
        return context


def article(request, slug):
    post = Post.objects.get(slug=slug)
    releted_articles = Post.objects.filter(category_id=post.category_id).exclude(id=post.id)[:3]
    context = {
        "post": post,
        "releted_articles": releted_articles,
    }
    return render(request, "blog/blog_detail.html", context=context)


# def post_by_category(request, slug):
#     posts = Post.objects.filter(category__slug=slug)
#     context = {"post_list": posts}


class PostListCategory(generic.ListView):
    template_name = "blog_list.html"
    paginate_by = 10

    def get_queryset(self):
        posts = Post.objects.filter(
            category__slug=self.kwargs["slug"], is_draft=False
        ).order_by("-id")
        return posts

    def get_context_data(self, **kwargs):
        context = super(PostListCategory, self).get_context_data(**kwargs)
        categories = Category.objects.annotate(post_count=Count("post"))
        context["categories"] = categories
        return context