from django.contrib import admin
from django import forms
from django.forms import Select
from django.utils.safestring import mark_safe

from .models import TechStack

class Select2Widget(Select):
    def render(self, name, value, attrs=None, renderer=None):
        output = super().render(name, value, attrs, renderer)
        script = f"""
        <script>
            document.addEventListener('DOMContentLoaded', function() {{
                if (typeof django !== 'undefined' && django.jQuery) {{
                    django.jQuery('#id_{name}').select2({{
                        width: '350px'
                    }});
                }}
            }});
        </script>
        """
        return mark_safe(output + script)

    @property
    def media(self):
        from django.forms import Media
        return Media(
            css={'all': ('admin/css/vendor/select2/select2.css',)},
            js=(
                'admin/js/vendor/jquery/jquery.js',
                'admin/js/vendor/select2/select2.full.js',
            )
        )

class TechStackForm(forms.ModelForm):
    class Meta:
        model = TechStack
        fields = '__all__'
        widgets = {
            'icon_name': Select2Widget()
        }

@admin.register(TechStack)
class TechStackAdmin(admin.ModelAdmin):
    form = TechStackForm
    list_display = (
        'name',
        'category',
        'proficiency',
        'icon_name',
        'order',
    )
    
    list_editable = (
        'order',
    )

    list_filter = (
        'category',
    )

    search_fields = (
        'name',
    )